import responseMessage from "../../constant/responseMessage.js";
import couponModel from "../../models/coupon.model.js";
import couponUsageModel from "../../models/couponUsage.model.js";
import propertyModel from "../../models/property.model.js";
import httpError from "../../util/httpError.js";
import httpResponse from "../../util/httpResponse.js";

export default {
    createCoupon: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const {
                code,
                description,
                discountType,
                discountValue,
                minBookingAmount,
                maxDiscountAmount,
                validFrom,
                validUntil,
                usageLimit,
                userUsageLimit,
                applicableFor
            } = req.body;

            if (!code || !description || !discountType || !discountValue || !validFrom || !validUntil) {
                return httpError(next, new Error(responseMessage.COMMON.INVALID_PARAMETERS()), req, 400);
            }

            const validFromDate = new Date(validFrom);
            const validUntilDate = new Date(validUntil);

            if (isNaN(validFromDate.getTime()) || isNaN(validUntilDate.getTime())) {
                return httpError(next, new Error(responseMessage.customMessage('Invalid date format')), req, 400);
            }

            if (validUntilDate <= validFromDate) {
                return httpError(next, new Error(responseMessage.customMessage('Valid until date must be after valid from date')), req, 400);
            }

            if (discountType === 'percentage' && discountValue > 100) {
                return httpError(next, new Error(responseMessage.customMessage('Percentage discount cannot exceed 100%')), req, 400);
            }

            if (discountValue <= 0) {
                return httpError(next, new Error(responseMessage.customMessage('Discount value must be greater than 0')), req, 400);
            }

            const existingCoupon = await couponModel.findOne({ code: code.toUpperCase() }).lean();

            if (existingCoupon) {
                return httpError(next, new Error(responseMessage.customMessage('Coupon code already exists')), req, 400);
            }

            const coupon = await couponModel.create({
                code: code.toUpperCase(),
                description,
                discountType,
                discountValue,
                minBookingAmount: minBookingAmount || 0,
                maxDiscountAmount: maxDiscountAmount || null,
                validFrom: validFromDate,
                validUntil: validUntilDate,
                usageLimit: usageLimit || null,
                userUsageLimit: userUsageLimit || 1,
                applicableFor: applicableFor || 'all',
                createdBy: userId
            });

            return httpResponse(req, res, 201, responseMessage.SUCCESS, {
                couponId: coupon._id,
                code: coupon.code
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    applyCoupon: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { code, propertyId, bookingAmount } = req.body;

            if (!code || !propertyId || !bookingAmount) {
                return httpError(next, new Error(responseMessage.COMMON.INVALID_PARAMETERS()), req, 400);
            }

            if (bookingAmount <= 0) {
                return httpError(next, new Error(responseMessage.customMessage('Invalid booking amount')), req, 400);
            }

            const coupon = await couponModel.findOne({
                code: code.toUpperCase(),
                isActive: true
            }).lean();

            if (!coupon) {
                return httpError(next, new Error(responseMessage.customMessage('Invalid or inactive coupon code')), req, 404);
            }

            const now = new Date();
            if (now < new Date(coupon.validFrom) || now > new Date(coupon.validUntil)) {
                return httpError(next, new Error(responseMessage.customMessage('Coupon has expired or not yet valid')), req, 400);
            }

            if (bookingAmount < coupon.minBookingAmount) {
                return httpError(next, new Error(responseMessage.customMessage(`Minimum booking amount of ${coupon.minBookingAmount} required`)), req, 400);
            }

            if (coupon.usageLimit !== null && coupon.usageCount >= coupon.usageLimit) {
                return httpError(next, new Error(responseMessage.customMessage('Coupon usage limit reached')), req, 400);
            }

            const userUsageCount = await couponUsageModel.countDocuments({
                couponId: coupon._id,
                userId
            });

            if (userUsageCount >= coupon.userUsageLimit) {
                return httpError(next, new Error(responseMessage.customMessage('You have already used this coupon maximum times')), req, 400);
            }

            if (coupon.applicableFor !== 'all') {
                const property = await propertyModel.findById(propertyId).lean();

                if (!property) {
                    return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Property')), req, 404);
                }

                if (property.type !== coupon.applicableFor) {
                    return httpError(next, new Error(responseMessage.customMessage(`Coupon is only applicable for ${coupon.applicableFor} bookings`)), req, 400);
                }
            }

            let discountAmount = 0;

            if (coupon.discountType === 'percentage') {
                discountAmount = (bookingAmount * coupon.discountValue) / 100;
            } else if (coupon.discountType === 'fixed') {
                discountAmount = coupon.discountValue;
            }

            if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
                discountAmount = coupon.maxDiscountAmount;
            }

            if (discountAmount > bookingAmount) {
                discountAmount = bookingAmount;
            }

            const finalAmount = bookingAmount - discountAmount;

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                couponCode: coupon.code,
                discountType: coupon.discountType,
                discountValue: coupon.discountValue,
                discountAmount: Math.round(discountAmount * 100) / 100,
                originalAmount: bookingAmount,
                finalAmount: Math.round(finalAmount * 100) / 100
            });

        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    getAllCoupons: async (req, res, next) => {
        try {
            const { page = 1, limit = 10, isActive } = req.query;

            const skip = (Number(page) - 1) * Number(limit);

            const filter = {};
            if (isActive !== undefined) {
                filter.isActive = isActive === 'true';
            }

            const coupons = await couponModel.find(filter)
                .select('-createdBy')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit))
                .lean();

            const total = await couponModel.countDocuments(filter);

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                coupons,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / limit),
                    hasNextPage: page < Math.ceil(total / limit),
                    hasPrevPage: page > 1
                }
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    toggleCouponStatus: async (req, res, next) => {
        try {
            const { couponId } = req.body;

            if (!couponId) {
                return httpError(next, new Error(responseMessage.COMMON.INVALID_PARAMETERS()), req, 400);
            }

            const coupon = await couponModel.findById(couponId);

            if (!coupon) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Coupon')), req, 404);
            }

            coupon.isActive = !coupon.isActive;
            await coupon.save();

            return httpResponse(req, res, 200, responseMessage.UPDATED, {
                isActive: coupon.isActive
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
};
