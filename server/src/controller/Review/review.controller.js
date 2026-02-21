import Review from "../../models/review.model.js";
import Booking from "../../models/booking.model.js";
import Property from "../../models/property.model.js";
import httpError from "../../util/httpError.js";
import httpResponse from "../../util/httpResponse.js";
import responseMessage from "../../constant/responseMessage.js";
import { Types } from "mongoose";

export default {
    createReview: async (req, res, next) => {
        try {
            const { propertyId, bookingId, rating, review, images, highlightedPoints } = req.body;
            const { userId } = req.user;

            if (!propertyId || !bookingId || !rating || !review) {
                return httpError(next, new Error(responseMessage.COMMON.INVALID_PARAMETERS()), req, 400);
            }

            const booking = await Booking.findOne({
                _id: bookingId,
                userId: userId,
                propertyId: propertyId
            });

            if (!booking) {
                return httpError(next, new Error(responseMessage.customMessage("Invalid booking or you are not authorized to review this property.")), req, 403);
            }

            if (booking.status !== 'confirmed') {
                return httpError(next, new Error(responseMessage.customMessage("You can only review confirmed bookings.")), req, 400);
            }

            const existingReview = await Review.findOne({ bookingId });
            if (existingReview) {
                return httpError(next, new Error(responseMessage.customMessage("You have already submitted a review for this booking.")), req, 400);
            }

            const newReview = await Review.create({
                userId,
                propertyId,
                bookingId,
                rating,
                review,
                images,
                highlightedPoints
            });

            const stats = await Review.aggregate([
                { $match: { propertyId: new Types.ObjectId(propertyId) } },
                {
                    $group: {
                        _id: '$propertyId',
                        nRating: { $sum: 1 },
                        avgRating: { $avg: '$rating' }
                    }
                }
            ]);

            if (stats.length > 0) {
                await Property.findByIdAndUpdate(propertyId, {
                    rating: stats[0].avgRating
                });
            }

            return httpResponse(req, res, 201, responseMessage.CREATED, {
                review: newReview
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    getPropertyReviews: async (req, res, next) => {
        try {
            const { propertyId } = req.params;
            const { page = 1, limit = 10 } = req.query;

            const skip = (Number(page) - 1) * Number(limit);

            const reviews = await Review.find({ propertyId })
                .populate('userId', 'firstName lastName profilePicture')
                .sort('-createdAt')
                .skip(skip)
                .limit(Number(limit));

            const total = await Review.countDocuments({ propertyId });

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                results: reviews.length,
                reviews,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    pages: Math.ceil(total / Number(limit))
                }
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    getAllReviews: async (req, res, next) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const skip = (Number(page) - 1) * Number(limit);

            const reviews = await Review.find()
                .populate('userId', 'firstName lastName profilePicture')
                .populate('propertyId', 'name coverImage address')
                .sort('-createdAt')
                .skip(skip)
                .limit(Number(limit));

            const total = await Review.countDocuments();

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                results: reviews.length,
                reviews,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    pages: Math.ceil(total / Number(limit))
                }
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    getReviewImages: async (req, res, next) => {
        try {
            const { propertyId, page = 1, limit = 10 } = req.query;
            const skip = (Number(page) - 1) * Number(limit);

            const matchStage = {};
            if (propertyId) {
                matchStage.propertyId = new Types.ObjectId(propertyId);
            }
            matchStage.images = { $exists: true, $not: { $size: 0 } };

            const pipeline = [
                { $match: matchStage },
                { $unwind: "$images" },
                { $project: { _id: 1, image: "$images", propertyId: 1, userId: 1, createdAt: 1 } },
                { $sort: { createdAt: -1 } },
                {
                    $facet: {
                        metadata: [{ $count: "total" }],
                        data: [{ $skip: skip }, { $limit: Number(limit) }]
                    }
                }
            ];

            const result = await Review.aggregate(pipeline);

            const data = result[0].data;
            const total = result[0].metadata[0] ? result[0].metadata[0].total : 0;

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                results: data.length,
                images: data,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    pages: Math.ceil(total / Number(limit))
                }
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    markHelpful: async (req, res, next) => {
        try {
            const { reviewId } = req.params;

            const review = await Review.findByIdAndUpdate(
                reviewId,
                { $inc: { helpfulness: 1 } },
                { new: true }
            );

            if (!review) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Review')), req, 404);
            }

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                helpfulness: review.helpfulness
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
};
