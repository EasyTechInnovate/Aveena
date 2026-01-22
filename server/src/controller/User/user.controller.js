import User from "../../models/user.model.js";
import Property from "../../models/property.model.js";
import httpError from "../../util/httpError.js";
import httpResponse from "../../util/httpResponse.js";
import responseMessage from "../../constant/responseMessage.js";

export default {
    toggleWishlist: async (req, res, next) => {
        try {
            const { propertyId } = req.params;
            const userId = req.user._id;

            const property = await Property.findById(propertyId);
            if (!property) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Property')), req, 404);
            }

            const user = await User.findById(userId);
            if (!user) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('User')), req, 404);
            }

            const isWishlisted = user.wishlist.includes(propertyId);

            if (isWishlisted) {
                user.wishlist.pull(propertyId);
            } else {
                if (user.wishlist.length >= 20) {
                    return httpError(next, new Error(responseMessage.customMessage('Wishlist limit reached. You can only wishlist up to 20 properties.')), req, 400);
                }
                user.wishlist.push(propertyId);
            }

            await user.save();

            return httpResponse(req, res, 200, isWishlisted ? responseMessage.customMessage('Property removed from wishlist') : responseMessage.customMessage('Property added to wishlist'), user.wishlist);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    getWishlist: async (req, res, next) => {
        try {
            const userId = req.user._id;
            const { page = 1, limit = 10 } = req.query;

            const user = await User.findById(userId);

            if (!user) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('User')), req, 404);
            }

            const skip = (Number(page) - 1) * Number(limit);

            const matchFilter = {
                _id: { $in: user.wishlist },
                isActive: true
            };

            const pipeline = [
                {
                    $match: matchFilter
                },
                {
                    $addFields: {
                        bookedUnits: 0,
                        availableUnits: "$totalUnits"
                    }
                },
                {
                    $sort: { createdAt: -1 }
                },
                { $skip: skip },
                { $limit: Number(limit) },
                {
                    $project: {
                        ownerId: 0,
                        bookings: 0
                    }
                }
            ];

            const properties = await Property.aggregate(pipeline);

            const countPipeline = [
                {
                    $match: matchFilter
                },
                {
                    $count: "total"
                }
            ];

            const countResult = await Property.aggregate(countPipeline);
            const total = countResult.length > 0 ? countResult[0].total : 0;

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                properties,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / limit)
                }
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
}
