import User from "../../models/user.model.js";
import Property from "../../models/property.model.js";
import Review from "../../models/review.model.js";
import Feedback from "../../models/feedback.model.js";
import httpError from "../../util/httpError.js";
import httpResponse from "../../util/httpResponse.js";
import responseMessage from "../../constant/responseMessage.js";
import quicker from "../../util/quicker.js";

export default {
    toggleWishlist: async (req, res, next) => {
        try {
            const { propertyId } = req.params;
            const userId = req.user.userId;

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
            const userId = req.user.userId;
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
                { $match: matchFilter },
                { $addFields: { bookedUnits: 0, availableUnits: "$totalUnits" } },
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: Number(limit) },
                { $project: { ownerId: 0, bookings: 0 } }
            ];

            const countPipeline = [
                { $match: matchFilter },
                { $count: "total" }
            ];

            const [properties, countResult] = await Promise.all([
                Property.aggregate(pipeline),
                Property.aggregate(countPipeline)
            ]);

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
    },

    changePassword: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { currentPassword, newPassword } = req.body;

            const user = await User.findById(userId).select('+password');
            if (!user) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('User')), req, 404);
            }

            if (!user.password) {
                const err = new Error('Password not set for this account. Use OTP or Google login.');
                err.statusCode = 400;
                return httpError(next, err, req, 400);
            }

            const isMatch = quicker.comparePassword(currentPassword, user.password);
            if (!isMatch) {
                const err = new Error('Current password is incorrect.');
                err.statusCode = 400;
                return httpError(next, err, req, 400);
            }

            user.password = quicker.hashPassword(newPassword);
            await user.save();

            return httpResponse(req, res, 200, responseMessage.customMessage('Password updated successfully'), null);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    updateContact: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { verificationCode, email, phone } = req.body;

            const user = await User.findById(userId);
            if (!user) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('User')), req, 404);
            }

            if (!user.verification?.code) {
                const err = new Error('No OTP found. Please request a new OTP first.');
                err.statusCode = 400;
                return httpError(next, err, req, 400);
            }

            if (user.verification.expiresAt < new Date()) {
                const err = new Error('OTP has expired. Please request a new OTP.');
                err.statusCode = 400;
                return httpError(next, err, req, 400);
            }

            if (!quicker.compareOtp(verificationCode, user.verification.code)) {
                const err = new Error('Invalid OTP.');
                err.statusCode = 400;
                return httpError(next, err, req, 400);
            }

            if (email) {
                const existing = await User.findOne({ email, _id: { $ne: userId } }).lean();
                if (existing) {
                    const err = new Error(responseMessage.ERROR.ALREADY_EXISTS('Email'));
                    err.statusCode = 409;
                    return httpError(next, err, req, 409);
                }
                user.email = email;
            }

            if (phone) {
                const existing = await User.findOne({ 'phone.number': phone.number, _id: { $ne: userId } }).lean();
                if (existing) {
                    const err = new Error(responseMessage.ERROR.ALREADY_EXISTS('Phone number'));
                    err.statusCode = 409;
                    return httpError(next, err, req, 409);
                }
                user.phone.countryCode = phone.countryCode;
                user.phone.number = phone.number;
            }

            user.verification.code = undefined;
            user.verification.expiresAt = undefined;
            await user.save();

            return httpResponse(req, res, 200, responseMessage.customMessage('Contact updated successfully'), null);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    uploadIdentity: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { documentType, documentUrl } = req.body;

            const user = await User.findById(userId);
            if (!user) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('User')), req, 404);
            }

            if (!user.identityDocuments) user.identityDocuments = {};
            user.identityDocuments[documentType] = documentUrl;
            user.isIdentityVerified = false;
            user.markModified('identityDocuments');
            await user.save();

            return httpResponse(req, res, 200, responseMessage.customMessage('Document submitted for verification'), null);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    getIdentityStatus: async (req, res, next) => {
        try {
            const { userId } = req.user;

            const user = await User.findById(userId).select('identityDocuments isIdentityVerified').lean();
            if (!user) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('User')), req, 404);
            }

            const docs = user.identityDocuments || {};
            const hasAnyDoc = Object.values(docs).some(v => !!v);

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                documents: {
                    aadhaar: docs.aadhaar || null,
                    pan: docs.pan || null,
                    passport: docs.passport || null,
                    drivingLicence: docs.drivingLicence || null
                },
                isVerified: user.isIdentityVerified,
                status: hasAnyDoc
                    ? (user.isIdentityVerified ? 'verified' : 'pending')
                    : 'not_submitted'
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    submitFeedback: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { type, message } = req.body;

            const feedback = await Feedback.create({ userId, type, message });

            return httpResponse(req, res, 201, responseMessage.customMessage('Feedback submitted successfully'), { feedback });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    getMyReviews: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { page = 1, limit = 10 } = req.query;

            const skip = (Number(page) - 1) * Number(limit);
            const filter = { userId };

            const [total, reviews] = await Promise.all([
                Review.countDocuments(filter),
                Review.find(filter)
                    .populate('propertyId', 'name coverImage address')
                    .select('rating review images highlightedPoints createdAt propertyId')
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(Number(limit))
                    .lean()
            ]);

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                reviews,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / Number(limit)),
                    hasNextPage: (parseInt(page) - 1) * Number(limit) + reviews.length < total
                }
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
}
