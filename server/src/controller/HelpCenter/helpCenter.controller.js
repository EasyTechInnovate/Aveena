import ticketModel from "../../models/ticket.model.js";
import httpError from "../../util/httpError.js";
import httpResponse from "../../util/httpResponse.js";
import responseMessage from "../../constant/responseMessage.js";
import crypto from 'crypto';
import mongoose from 'mongoose';

const generateTicketId = () => {
    return 'TKT-' + crypto.randomBytes(4).toString('hex').toUpperCase();
};

export default {
    create: async (req, res, next) => {
        try {
            const { subject, message, mediaUrls } = req.body;
            const userId = req.user._id;

            const ticketId = generateTicketId();

            const ticket = await ticketModel.create({
                ticketId,
                user: userId,
                subject,
                messages: [{
                    sender: userId,
                    message,
                    mediaUrls: mediaUrls || []
                }]
            });

            return httpResponse(req, res, 201, responseMessage.CREATED, ticket);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const { page = 1, limit = 10, status, search } = req.query;
            const skip = (Number(page) - 1) * Number(limit);
            const userId = req.user._id;
            const userType = req.user.type;

            let query = {};
            if (userType === 'customer' || userType === 'property_owner') {
                query.user = userId;
            }

            if (status) query.status = status;
            if (search) {
                query.$or = [
                    { ticketId: { $regex: search, $options: 'i' } },
                    { subject: { $regex: search, $options: 'i' } }
                ];
            }

            const tickets = await ticketModel.find(query)
                .sort({ updatedAt: -1 })
                .skip(skip)
                .limit(Number(limit))
                .populate('user', 'firstName lastName email profilePicture');

            const total = await ticketModel.countDocuments(query);

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                tickets,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / limit)
                }
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const userId = req.user._id;
            const userType = req.user.type;

            const ticket = await ticketModel.findById(id)
                .populate('user', 'firstName lastName email profilePicture')
                .populate('messages.sender', 'firstName lastName email profilePicture type');

            if (!ticket) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Ticket')), req, 404);
            }

            if (userType !== 'admin' && userType !== 'team_member' && ticket.user._id.toString() !== userId.toString()) {
                return httpError(next, new Error(responseMessage.COMMON.ACTION_NOT_ALLOWED), req, 403);
            }

            return httpResponse(req, res, 200, responseMessage.SUCCESS, ticket);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    reply: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { message, mediaUrls } = req.body;
            const userId = req.user._id;
            const userType = req.user.type;

            const ticket = await ticketModel.findById(id);
            if (!ticket) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Ticket')), req, 404);
            }

            if (userType !== 'admin' && userType !== 'team_member' && ticket.user.toString() !== userId.toString()) {
                return httpError(next, new Error(responseMessage.COMMON.ACTION_NOT_ALLOWED), req, 403);
            }

            if (ticket.status === 'closed') {
                return httpError(next, new Error("Cannot reply to a closed ticket"), req, 400);
            }

            ticket.messages.push({
                sender: userId,
                message,
                mediaUrls: mediaUrls || []
            });

            ticket.lastMessageAt = new Date();

            await ticket.save();

            await ticket.populate('messages.sender', 'firstName lastName email profilePicture type');

            return httpResponse(req, res, 200, responseMessage.UPDATED, ticket);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    updateStatus: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const ticket = await ticketModel.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );

            if (!ticket) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Ticket')), req, 404);
            }

            return httpResponse(req, res, 200, responseMessage.UPDATED, ticket);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    close: async (req, res, next) => {
        try {
            const { id } = req.params;
            const userId = req.user._id;
            const userType = req.user.type;

            const ticket = await ticketModel.findById(id);

            if (!ticket) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Ticket')), req, 404);
            }

            if (userType !== 'admin' && userType !== 'team_member' && ticket.user.toString() !== userId.toString()) {
                return httpError(next, new Error(responseMessage.COMMON.ACTION_NOT_ALLOWED), req, 403);
            }

            ticket.status = 'closed';
            ticket.isClosed = true;

            await ticket.save();

            return httpResponse(req, res, 200, responseMessage.UPDATED, ticket);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    getMessages: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { page = 1, limit = 20 } = req.query;
            const userId = req.user._id;
            const userType = req.user.type;

            const skip = (Number(page) - 1) * Number(limit);

            const metaPipeline = [
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $project: {
                        user: 1,
                        totalMessages: { $size: "$messages" }
                    }
                }
            ];

            const metaResult = await ticketModel.aggregate(metaPipeline);

            if (!metaResult.length) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Ticket')), req, 404);
            }

            const ticketMeta = metaResult[0];

            if (userType !== 'admin' && userType !== 'team_member' && ticketMeta.user.toString() !== userId.toString()) {
                return httpError(next, new Error(responseMessage.COMMON.ACTION_NOT_ALLOWED), req, 403);
            }

            const ticketData = await ticketModel.findById(id, {
                messages: { $slice: [skip, Number(limit)] }
            }).populate('messages.sender', 'firstName lastName email profilePicture type');

            const total = ticketMeta.totalMessages;
            const totalPages = Math.ceil(total / Number(limit));

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                messages: ticketData.messages,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages
                }
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
}
