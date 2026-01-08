import httpError from "../../util/httpError.js";
import httpResponse from "../../util/httpResponse.js";
import propertyModel from "../../models/property.model.js";
import bookedDatesModel from "../../models/bookedDates.model.js";
import availabilityexceptionModel from "../../models/availabilityexception.model.js";
import { startSession } from "mongoose";
import userModel from "../../models/user.model.js";
import bookingModel from "../../models/booking.model.js";
import transactionModel from "../../models/transaction.model.js";
import config from "../../config/config.js";
import crypto from "crypto";
import axios from "axios";
import responseMessage from "../../constant/responseMessage.js";
import { gst } from "../../constant/application.js";
import couponModel from "../../models/coupon.model.js";
import couponUsageModel from "../../models/couponUsage.model.js";


export default {
    createBooking: async (req, res, next) => {
        try {

            const { userId } = req.user;

            const { propertyId, checkInDate, checkOutDate, adults, childrens, noOfRooms, couponCode } = req.body;

            if (!propertyId || !checkInDate || !checkOutDate || !adults || !noOfRooms) {
                return httpError(next, new Error(responseMessage.COMMON.INVALID_PARAMETERS()), req, 400);
            }

            const checkIn = new Date(checkInDate);
            const checkOut = new Date(checkOutDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
                return httpError(next, new Error(responseMessage.customMessage('Invalid date format')), req, 400);
            }

            if (checkIn < today) {
                return httpError(next, new Error(responseMessage.customMessage('Check-in date cannot be in the past')), req, 400);
            }

            if (checkOut <= checkIn) {
                return httpError(next, new Error(responseMessage.customMessage('Check-out date must be after check-in date')), req, 400);
            }

            if (adults < 1 || noOfRooms < 1) {
                return httpError(next, new Error(responseMessage.customMessage('At least 1 adult and 1 room required')), req, 400);
            }

            const property = await propertyModel.findById(propertyId).lean();

            if (!property) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Property')), req, 404);
            };

            if (!property.isActive) {
                return httpError(next, new Error(responseMessage.customMessage('Property is not active for booking.')), req, 400);
            }

            if (property.totalUnits < noOfRooms) {
                return httpError(next, new Error(responseMessage.customMessage('Not enough rooms available.')), req, 400);
            }

            if (property.capacity.adults < adults || property.capacity.childrens < childrens) {
                return httpError(next, new Error(responseMessage.customMessage('Not enough capacity available.')), req, 400);
            }



            const bookedUnitsPerDate = await bookedDatesModel.find({
                entityType: 'property',
                entityId: propertyId,
                date: {
                    $gte: checkIn,
                    $lt: checkOut
                }
            })

            if (bookedUnitsPerDate.length > 0) {
                return httpError(next, new Error(responseMessage.customMessage('Dates already booked.')), req, 400);
            }


            const isInavailable = await availabilityexceptionModel.findOne({
                entityType: 'property',
                entityId: propertyId,
                date: {
                    $gte: checkIn,
                    $lt: checkOut
                },
                isBlocked: true
            }).lean();

            if (isInavailable) {
                return httpError(next, new Error(responseMessage.customMessage('Selected dates are not available.')), req, 400);
            }

            const user = await userModel.findById(userId).lean();

            if (!user) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('User')), req, 404);
            };

            if (!user.isProfileComplete) {
                return httpError(next, new Error(responseMessage.AUTH.PROFILE_NOT_COMPLETE), req, 401);
            }

            // if(!user.isIdentityVerified) {
            //     return httpError(next, new Error(responseMessage.AUTH.NO_IDENTITYFICATION_PROVIDED), req, 401);
            // }

            const noOfNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

            const base = property.basePrice * noOfNights;
            const taxes = base * gst;
            let discount = 0;
            let appliedCoupon = null;

            if (couponCode) {
                const coupon = await couponModel.findOne({
                    code: couponCode.toUpperCase(),
                    isActive: true
                }).lean();

                if (coupon) {
                    const now = new Date();
                    const isValidDate = now >= new Date(coupon.validFrom) && now <= new Date(coupon.validUntil);
                    const hasUsageLimit = coupon.usageLimit === null || coupon.usageCount < coupon.usageLimit;

                    if (isValidDate && hasUsageLimit) {
                        const userUsageCount = await couponUsageModel.countDocuments({
                            couponId: coupon._id,
                            userId
                        });

                        const canUserUse = userUsageCount < coupon.userUsageLimit;
                        const meetsMinAmount = (base + taxes) >= coupon.minBookingAmount;
                        const propertyTypeMatches = coupon.applicableFor === 'all' || coupon.applicableFor === property.type;

                        if (canUserUse && meetsMinAmount && propertyTypeMatches) {
                            if (coupon.discountType === 'percentage') {
                                discount = ((base + taxes) * coupon.discountValue) / 100;
                            } else if (coupon.discountType === 'fixed') {
                                discount = coupon.discountValue;
                            }

                            if (coupon.maxDiscountAmount && discount > coupon.maxDiscountAmount) {
                                discount = coupon.maxDiscountAmount;
                            }

                            if (discount > (base + taxes)) {
                                discount = base + taxes;
                            }

                            appliedCoupon = coupon;
                        }
                    }
                }
            }

            const finalAmount = base + taxes - discount;

            const session = await startSession();
            session.startTransaction();

            const booking = await bookingModel.create([{
                userId,
                propertyId,
                checkIn: checkIn,
                checkOut: checkOut,
                nights: noOfNights,
                guests: {
                    adults: adults,
                    childrens: childrens
                },
                priceBreakdown: {
                    base,
                    taxes,
                    discount: Math.round(discount * 100) / 100,
                    total: Math.round(finalAmount * 100) / 100
                },
                couponCode: appliedCoupon ? appliedCoupon.code : undefined,
                couponId: appliedCoupon ? appliedCoupon._id : undefined
            }], { session }).then(docs => docs[0]);
            const txnid = 'PAYU_' + Date.now();

            const transaction = await transactionModel.create([{
                userId,
                bookingId: booking._id,
                amount: finalAmount,
                paymentMode: 'online',
                txnId: txnid
            }], { session }).then(docs => docs[0]);

            await session.commitTransaction();
            await session.endSession();


            const productinfo = JSON.stringify({
                propertyId: property._id,
                bookingId: booking._id,
                transactionId: txnid
            });

            const productinfoString = `{"propertyId":"${property._id}","bookingId":"${booking._id}","transactionId":"${txnid}"}`;


            const hashString = `${config.payu.key}|${txnid}|${finalAmount}|${productinfoString}|${user.firstName}|${user.email}|` + `||||||||||${config.payu.salt}`;
            console.log(hashString);

            const hash = crypto.createHash('sha512').update(hashString).digest('hex');

            const params = {
                key: config.payu.key,
                txnid,
                amount: finalAmount,
                productinfo,
                firstname: user.firstName,
                email: user.email,
                phone: user.phone.number,
                surl: config.payu.successUrl,
                furl: config.payu.failureUrl,
                hash
            }

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                payuUrl: config.payu.baseUrl,
                params
            });

        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    paymentSuccess: async (req, res, next) => {
        try {

            const { txnid, mode } = req.body;

            const transaction = await transactionModel.findOne({ txnId: txnid }).lean();

            if (!transaction) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Transaction')), req, 404);
            };

            const booking = await bookingModel.findById(transaction.bookingId).lean();

            if (!booking) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Booking')), req, 404);
            };
            console.log(txnid);

            const verifyHash = crypto.createHash('sha512').update(`${config.payu.key}|verify_payment|${txnid}|${config.payu.salt}`).digest('hex');

            const verifyPayload = new URLSearchParams();

            verifyPayload.append('key', config.payu.key);
            verifyPayload.append('command', 'verify_payment');
            verifyPayload.append('var1', txnid);
            verifyPayload.append('hash', verifyHash);

            const verifyRes = await axios.post(config.payu.verifyUrl, verifyPayload.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const verifyData = verifyRes.data;

            const tx = verifyData?.transaction_details?.[txnid];
            console.log(tx);

            let verified = false;

            if (tx) {
                if (
                    tx.status?.toLowerCase() === "success"
                ) {
                    verified = true;
                }
            }

            if (!verified) {

                const session = await startSession();
                session.startTransaction();

                await transactionModel.updateOne({ txnId: txnid }, { $set: { status: 'failed' } }, { session });
                await bookingModel.updateOne({ _id: booking._id }, { $set: { status: 'failed' } }, { session });

                await session.commitTransaction();
                await session.endSession();
                return httpError(next, new Error(responseMessage.customMessage('Payment verification failed')), req, 400);
            }

            const session = await startSession();
            session.startTransaction();

            await transactionModel.updateOne({ txnId: txnid }, { $set: { status: 'success', paymentMode: mode } }, { session });
            await bookingModel.updateOne({ _id: booking._id }, { $set: { status: 'confirmed' } }, { session });

            for (let i = 0; i < booking.nights; i++) {
                await bookedDatesModel.create([{
                    entityType: 'property',
                    entityId: booking.propertyId,
                    date: new Date(new Date(booking.checkIn).setDate(new Date(booking.checkIn).getDate() + i)),
                    bookingId: booking._id,
                    unitsBooked: 1
                }], { session });

            };

            if (booking.couponId) {
                await couponUsageModel.create([{
                    couponId: booking.couponId,
                    userId: booking.userId,
                    bookingId: booking._id,
                    discountAmount: booking.priceBreakdown.discount
                }], { session });

                await couponModel.updateOne(
                    { _id: booking.couponId },
                    { $inc: { usageCount: 1 } },
                    { session }
                );
            }

            await session.commitTransaction();
            await session.endSession();


            return res.redirect(`${config.frontendUrl}/trips-bookings?success=true`);

        } catch (error) {
            console.error(error);

            return httpError(next, error, req, 500);
        }
    },
    paymentFailure: async (req, res, next) => {
        try {

            const { txnid } = req.body;

            const transaction = await transactionModel.findOne({ txnId: txnid }).lean();

            if (!transaction) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Transaction')), req, 404);
            };
            const booking = await bookingModel.findById(transaction.bookingId).lean();

            if (!booking) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Booking')), req, 404);
            };


            const session = await startSession();
            session.startTransaction();

            await bookingModel.updateOne({ _id: booking._id }, { $set: { status: 'cancelled' } }, { session });
            await transactionModel.updateOne({ _id: transaction._id }, { $set: { status: 'failed', addedOn: new Date() } }, { session });

            await session.commitTransaction();
            await session.endSession();

            return res.redirect(`${config.frontendUrl}/trips-bookings?success=false`);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    getMyBookings: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { page = 1, limit = 10 } = req.query;

            const skip = (page - 1) * limit;

            const bookings = await bookingModel.find({
                userId,
                status: { $in: ['confirmed', 'cancelled'] }
            })
                .populate({
                    path: 'propertyId',
                    select: 'coverImage name address _id description'
                })
                .sort({ checkIn: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .lean();

            const total = await bookingModel.countDocuments({
                userId,
                status: { $in: ['confirmed', 'cancelled'] }
            });

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                bookings,
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
    getBookedDatesForaProperty: async (req, res, next) => {
        try {
            const { propertyId } = req.params;
            const { startDate, endDate } = req.query;

            if (!propertyId) {
                return httpError(next, new Error(responseMessage.customMessage('Property ID is required')), req, 400);
            }

            if (!startDate || !endDate) {
                return httpError(next, new Error(responseMessage.customMessage('Start date and end date are required')), req, 400);
            }

            const start = new Date(startDate);
            const end = new Date(endDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                return httpError(next, new Error(responseMessage.customMessage('Invalid date format')), req, 400);
            }

            if (start < today) {
                return httpError(next, new Error(responseMessage.customMessage('Start date cannot be in the past')), req, 400);
            }

            if (end < today) {
                return httpError(next, new Error(responseMessage.customMessage('End date cannot be in the past')), req, 400);
            }

            if (end < start) {
                return httpError(next, new Error(responseMessage.customMessage('End date must be after or equal to start date')), req, 400);
            }

            const property = await propertyModel.findById(propertyId).lean();

            if (!property) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Property')), req, 404);
            }

            const bookedDates = await bookedDatesModel.find({
                entityType: 'property',
                entityId: propertyId,
                date: {
                    $gte: start,
                    $lte: end
                }
            }).lean();

            const bookedDatesOnly = bookedDates.map(item => item.date);

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                bookedDates: bookedDatesOnly,
            });

        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
}