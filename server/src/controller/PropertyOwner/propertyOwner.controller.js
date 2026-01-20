import bookingModel from "../../models/booking.model.js";
import propertyModel from "../../models/property.model.js";
import transactionModel from "../../models/transaction.model.js";
import propertyDetailsModel from "../../models/propertyDetails.model.js";
import httpError from "../../util/httpError.js";
import httpResponse from "../../util/httpResponse.js";
import responseMessage from "../../constant/responseMessage.js";
import mongoose from "mongoose";


export default {
    bookings: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { page = 1, limit = 10 } = req.query;

            const ownedProperties = await propertyModel.find({ ownerId: userId }).select('_id');
            const propertyIds = ownedProperties.map(p => p._id);

            const skip = (Number(page) - 1) * Number(limit);

            const pipeline = [
                {
                    $match: {
                        propertyId: { $in: propertyIds }
                    }
                },
                {
                    $sort: { createdAt: -1 }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'customer'
                    }
                },
                {
                    $unwind: {
                        path: '$customer',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'bookeddates',
                        localField: '_id',
                        foreignField: 'bookingId',
                        as: 'bookedDates'
                    }
                },
                {
                    $addFields: {
                        totalBookedUnits: { $sum: '$bookedDates.unitsBooked' }
                    }
                },
                {
                    $addFields: {
                        noOfRooms: {
                            $cond: {
                                if: { $gt: ["$nights", 0] },
                                then: { $ceil: { $divide: ["$totalBookedUnits", "$nights"] } },
                                else: "$totalBookedUnits"
                            }
                        }
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: Number(limit)
                },
                {
                    $project: {
                        _id: 1,
                        checkIn: 1,
                        checkOut: 1,
                        guests: 1,
                        status: 1,
                        priceBreakdown: 1,
                        "customer.firstName": 1,
                        "customer.lastName": 1,
                        "customer.email": 1,
                        "customer.profilePicture": 1,
                        noOfRooms: 1
                    }
                }
            ];

            const bookings = await bookingModel.aggregate(pipeline);

            const total = await bookingModel.countDocuments({ propertyId: { $in: propertyIds } });

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                bookings,
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
    getBookingById: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { id } = req.params;

            if (!id) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Booking')), req, 404);
            }

            const booking = await bookingModel.findById(id)
                .populate('userId', 'firstName lastName email profilePicture phone')
                .populate('propertyId', 'name address coverImage type');

            if (!booking) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Booking')), req, 404);
            }

            const property = await propertyModel.findOne({ _id: booking.propertyId._id, ownerId: userId });
            if (!property) {
                return httpError(next, new Error(responseMessage.customMessage('Unauthorized access to booking')), req, 403);
            }


            const bookedDates = await mongoose.model('BookedDates').find({ bookingId: id });
            const noOfRooms = booking.roomId ? 1 : (bookedDates.reduce((acc, curr) => acc + (curr.unitsBooked || 1), 0) / (booking.nights || 1));
            const totalUnitsBooked = bookedDates.reduce((acc, curr) => acc + (curr.unitsBooked || 1), 0);
            const calculatedRooms = booking.nights > 0 ? Math.round(totalUnitsBooked / booking.nights) : totalUnitsBooked;


            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                booking,
                noOfRooms: calculatedRooms
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    getPropertyById: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { id } = req.params;

            const property = await propertyModel.findOne({ _id: id, ownerId: userId }).lean();

            if (!property) {
                return httpError(next, new Error(responseMessage.PROPERTY_NOT_FOUND), req, 404);
            }

            const details = await propertyDetailsModel.findOne({ propertyId: id }).lean();

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                ...property,
                details: details || null
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    properties: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { page = 1, limit = 10 } = req.query;

            const skip = (Number(page) - 1) * Number(limit);

            const properties = await propertyModel.find({ ownerId: userId })
                .select('name type minimumRentalIncome saleTarget isActive kycVerified')
                .skip(skip)
                .limit(Number(limit))
                .sort({ createdAt: -1 });

            const total = await propertyModel.countDocuments({ ownerId: userId });

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
    dashboard: async (req, res, next) => {
        try {
            const { userId } = req.user;

            const ownedProperties = await propertyModel.find({ ownerId: userId }).select('_id');
            const propertyIds = ownedProperties.map(p => p._id);

            const statsAggregation = await bookingModel.aggregate([
                { $match: { propertyId: { $in: propertyIds } } },
                {
                    $group: {
                        _id: null,
                        totalBookings: { $sum: 1 },
                        activeBookings: {
                            $sum: { $cond: [{ $eq: ["$status", "confirmed"] }, 1, 0] }
                        },
                        reservedBookings: {
                            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] }
                        },
                        cancelledBookings: {
                            $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] }
                        },
                        revenue: {
                            $sum: {
                                $cond: [
                                    { $eq: ["$status", "confirmed"] },
                                    "$priceBreakdown.total",
                                    0
                                ]
                            }
                        }
                    }
                }
            ]);

            const stats = statsAggregation.length > 0 ? statsAggregation[0] : {
                totalBookings: 0,
                activeBookings: 0,
                reservedBookings: 0,
                cancelledBookings: 0,
                revenue: 0
            };
            delete stats._id;

            const recentBookingsPipeline = [
                {
                    $match: {
                        propertyId: { $in: propertyIds }
                    }
                },
                {
                    $sort: { createdAt: -1 }
                },
                {
                    $limit: 5
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'customer'
                    }
                },
                {
                    $unwind: {
                        path: '$customer',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'bookeddates',
                        localField: '_id',
                        foreignField: 'bookingId',
                        as: 'bookedDates'
                    }
                },
                {
                    $addFields: {
                        totalBookedUnits: { $sum: '$bookedDates.unitsBooked' }
                    }
                },
                {
                    $addFields: {
                        noOfRooms: {
                            $cond: {
                                if: { $gt: ["$nights", 0] },
                                then: { $ceil: { $divide: ["$totalBookedUnits", "$nights"] } },
                                else: "$totalBookedUnits"
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        checkIn: 1,
                        checkOut: 1,
                        guests: 1,
                        status: 1,
                        "customer.firstName": 1,
                        "customer.lastName": 1,
                        "customer.email": 1,
                        "customer.profilePicture": 1,
                        noOfRooms: 1
                    }
                }
            ];

            const recentBookings = await bookingModel.aggregate(recentBookingsPipeline);

            const recentProperties = await propertyModel.find({ ownerId: userId })
                .select('name type minimumRentalIncome saleTarget isActive kycVerified')
                .sort({ createdAt: -1 })
                .limit(5);

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                stats,
                recentBookings,
                recentProperties
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    statistics: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { year = new Date().getFullYear(), propertyId } = req.query;

            let propertyIds = [];

            if (propertyId) {
                const property = await propertyModel.findOne({ _id: propertyId, ownerId: userId });
                if (!property) {
                    return httpError(next, new Error(responseMessage.customMessage('Unauthorized access to property')), req, 403);
                }
                propertyIds = [new mongoose.Types.ObjectId(propertyId)];
            } else {
                const ownedProperties = await propertyModel.find({ ownerId: userId }).select('_id');
                propertyIds = ownedProperties.map(p => p._id);
            }

            const startDate = new Date(`${year}-01-01`);
            const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

            const revenueAggregation = await bookingModel.aggregate([
                {
                    $match: {
                        propertyId: { $in: propertyIds },
                        status: 'confirmed',
                        createdAt: { $gte: startDate, $lte: endDate }
                    }
                },
                {
                    $group: {
                        _id: { $month: "$createdAt" },
                        revenue: { $sum: "$priceBreakdown.total" }
                    }
                }
            ]);

            const months = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            const chartData = months.map((month, index) => {
                const monthData = revenueAggregation.find(data => data._id === index + 1);
                return {
                    name: month,
                    revenue: monthData ? monthData.revenue : 0
                };
            });

            return httpResponse(req, res, 200, responseMessage.SUCCESS, chartData);

        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
}