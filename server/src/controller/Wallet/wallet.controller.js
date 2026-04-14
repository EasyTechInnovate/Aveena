import Wallet from "../../models/wallet.model.js";
import User from "../../models/user.model.js";
import httpError from "../../util/httpError.js";
import httpResponse from "../../util/httpResponse.js";
import responseMessage from "../../constant/responseMessage.js";

const getOrCreateWallet = async (userId) => {
    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
        wallet = await Wallet.create({ userId, balance: 0, transactions: [] });
    }
    return wallet;
};

export { getOrCreateWallet };

export default {
    getWallet: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { page = 1, limit = 10 } = req.query;

            const wallet = await getOrCreateWallet(userId);

            const totalTransactions = wallet.transactions.length;
            const skip = (Number(page) - 1) * Number(limit);

            const transactions = wallet.transactions
                .slice()
                .reverse()
                .slice(skip, skip + Number(limit));

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                balance: wallet.balance,
                transactions,
                pagination: {
                    total: totalTransactions,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(totalTransactions / Number(limit)),
                    hasNextPage: skip + transactions.length < totalTransactions
                }
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    adminCredit: async (req, res, next) => {
        try {
            const { userId, amount, reason } = req.body;

            const user = await User.findById(userId).select('_id firstName').lean();
            if (!user) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('User')), req, 404);
            }

            const wallet = await getOrCreateWallet(userId);
            const balanceAfter = Math.round((wallet.balance + amount) * 100) / 100;

            await Wallet.findOneAndUpdate(
                { userId },
                {
                    $inc: { balance: amount },
                    $push: {
                        transactions: {
                            amount,
                            type: 'credit',
                            reason,
                            bookingId: null,
                            balanceAfter
                        }
                    }
                }
            );

            return httpResponse(req, res, 200, responseMessage.customMessage(`₹${amount} credited to wallet successfully`), {
                newBalance: balanceAfter
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
};
