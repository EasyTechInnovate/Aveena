import bookingModel from "../../models/booking.model.js";
import propertyModel from "../../models/property.model.js";
import userModel from "../../models/user.model.js";
import httpError from "../../util/httpError.js";
import httpResponse from "../../util/httpResponse.js";
import responseMessage from "../../constant/responseMessage.js";

export default {
    dashboard: async (req, res, next) => {
        try {
            const statsAggregation = await bookingModel.aggregate([
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
                        priceBreakdown: 1,
                        "customer.firstName": 1,
                        "customer.lastName": 1,
                        "customer.email": 1,
                        "customer.profilePicture": 1,
                        noOfRooms: 1
                    }
                }
            ];

            const recentBookings = await bookingModel.aggregate(recentBookingsPipeline);

            const recentProperties = await propertyModel.find({})
                .select('name type minimumRentalIncome saleTarget isActive kycVerified')
                .sort({ createdAt: -1 })
                .limit(5);

            const { year = new Date().getFullYear() } = req.query;
            const startDate = new Date(`${year}-01-01`);
            const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

            const revenueAggregation = await bookingModel.aggregate([
                {
                    $match: {
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

            const revenueChart = months.map((month, index) => {
                const monthData = revenueAggregation.find(data => data._id === index + 1);
                return {
                    name: month,
                    revenue: monthData ? monthData.revenue : 0
                };
            });

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                stats,
                recentBookings,
                recentProperties,
                revenueChart
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    statistics: async (req, res, next) => {
        try {
            const now = new Date();
            const dayOfWeek = now.getDay();
            const num = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
            const startOfWeek = new Date(now.setDate(num));
            startOfWeek.setHours(0, 0, 0, 0);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);

            const weeklyRevenue = await bookingModel.aggregate([
                {
                    $match: {
                        status: 'confirmed',
                        createdAt: { $gte: startOfWeek, $lte: endOfWeek }
                    }
                },
                {
                    $group: {
                        _id: { $dayOfWeek: "$createdAt" },
                        total: { $sum: "$priceBreakdown.total" }
                    }
                }
            ]);

            const weeklyCustomers = await userModel.aggregate([
                {
                    $match: {
                        createdAt: { $gte: startOfWeek, $lte: endOfWeek }
                    }
                },
                {
                    $group: {
                        _id: { $dayOfWeek: "$createdAt" },
                        count: { $sum: 1 }
                    }
                }
            ]);


            const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

            const mapToDays = (data, valueKey) => {
                return days.map((day, index) => {

                    let mongoDayId = index + 2;
                    if (mongoDayId > 7) mongoDayId = 1;

                    const found = data.find(d => d._id === mongoDayId);
                    return {
                        name: day,
                        value: found ? found[valueKey] : 0
                    };
                });
            };

            const revenueWeekly = mapToDays(weeklyRevenue, 'total');
            const customerWeekly = mapToDays(weeklyCustomers, 'count');

            const propertyStats = await propertyModel.aggregate([
                {
                    $group: {
                        _id: "$type",
                        count: { $sum: 1 }
                    }
                }
            ]);
            const propertyDistribution = propertyStats.map(stat => ({
                name: stat._id,
                value: stat.count
            }));


            const bookingStats = await bookingModel.aggregate([
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 }
                    }
                }
            ]);

            const totalBookingsCount = bookingStats.reduce((acc, curr) => acc + curr.count, 0);

            const bookingStatus = {
                total: totalBookingsCount,
                confirmed: bookingStats.find(s => s._id === 'confirmed')?.count || 0,
                cancelled: bookingStats.find(s => s._id === 'cancelled')?.count || 0,
                pending: bookingStats.find(s => s._id === 'pending')?.count || 0
            };

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                revenueWeekly,
                customerWeekly,
                propertyDistribution,
                bookingStatus
            });

        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    bookings: async (req, res, next) => {
        try {
            const { page = 1, limit = 10, search, status } = req.query;
            const skip = (Number(page) - 1) * Number(limit);

            const pipeline = [];

            // 1. Lookups first to allow search on joined fields
            pipeline.push(
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
                        from: 'properties',
                        localField: 'propertyId',
                        foreignField: '_id',
                        as: 'property'
                    }
                },
                {
                    $unwind: {
                        path: '$property',
                        preserveNullAndEmptyArrays: true
                    }
                }
            );

            // 2. Match Stage (Search & Filter)
            const matchQuery = {};

            if (status) {
                matchQuery.status = status;
            }

            if (search) {
                const searchRegex = { $regex: search, $options: 'i' };
                matchQuery.$or = [
                    { "customer.firstName": searchRegex },
                    { "customer.lastName": searchRegex },
                    { "property.name": searchRegex }
                ];
            }

            if (Object.keys(matchQuery).length > 0) {
                pipeline.push({ $match: matchQuery });
            }

            // 3. Sort
            pipeline.push({ $sort: { createdAt: -1 } });

            // 4. Facet for Total Count and Paginated Results
            // We need total count AFTER filtering for correct pagination
            pipeline.push({
                $facet: {
                    metadata: [{ $count: "total" }],
                    data: [
                        { $skip: skip },
                        { $limit: Number(limit) },
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
                                noOfRooms: 1,
                                "customer.firstName": 1,
                                "customer.lastName": 1,
                                "customer.email": 1,
                                "customer.profilePicture": 1,
                                "property.name": 1,
                                "property.address": 1
                            }
                        }
                    ]
                }
            });

            const result = await bookingModel.aggregate(pipeline);

            const bookings = result[0].data;
            const total = result[0].metadata[0] ? result[0].metadata[0].total : 0;

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
    customers: async (req, res, next) => {
        try {
            const { page = 1, limit = 10, search } = req.query;
            const skip = (Number(page) - 1) * Number(limit);

            const matchQuery = { type: 'customer' };

            if (search) {
                const searchRegex = { $regex: search, $options: 'i' };
                matchQuery.$or = [
                    { firstName: searchRegex },
                    { lastName: searchRegex },
                    { email: searchRegex }
                ];
            }

            const pipeline = [
                { $match: matchQuery },
                { $sort: { createdAt: -1 } },
                {
                    $lookup: {
                        from: 'bookings',
                        localField: '_id',
                        foreignField: 'userId',
                        as: 'bookings'
                    }
                },
                {
                    $addFields: {
                        totalBookings: { $size: '$bookings' }
                    }
                },
                {
                    $facet: {
                        metadata: [{ $count: "total" }],
                        data: [
                            { $skip: skip },
                            { $limit: Number(limit) },
                            {
                                $project: {
                                    _id: 1,
                                    firstName: 1,
                                    lastName: 1,
                                    email: 1,
                                    phone: 1,
                                    address: 1,
                                    totalBookings: 1
                                }
                            }
                        ]
                    }
                }
            ];

            const result = await userModel.aggregate(pipeline);

            const customers = result[0].data;
            const total = result[0].metadata[0] ? result[0].metadata[0].total : 0;

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                customers,
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
    properties: async (req, res, next) => {
        try {
            const { page = 1, limit = 10, search } = req.query;
            const skip = (Number(page) - 1) * Number(limit);

            const matchQuery = {};

            if (search) {
                const searchRegex = { $regex: search, $options: 'i' };
                matchQuery.name = searchRegex;
            }

            const pipeline = [
                { $match: matchQuery },
                { $sort: { createdAt: -1 } },
                {
                    $lookup: {
                        from: 'bookings',
                        localField: '_id',
                        foreignField: 'propertyId',
                        as: 'bookings'
                    }
                },
                {
                    $addFields: {
                        totalBookings: { $size: '$bookings' }
                    }
                },
                {
                    $facet: {
                        metadata: [{ $count: "total" }],
                        data: [
                            { $skip: skip },
                            { $limit: Number(limit) },
                            {
                                $project: {
                                    _id: 1,
                                    name: 1,
                                    type: 1,
                                    minimumRentalIncome: 1,
                                    saleTarget: 1,
                                    isActive: 1,
                                    kycVerified: 1,
                                    totalBookings: 1,
                                    coverImage: 1,
                                    address: 1
                                }
                            }
                        ]
                    }
                }
            ];

            const result = await propertyModel.aggregate(pipeline);

            const properties = result[0].data;
            const total = result[0].metadata[0] ? result[0].metadata[0].total : 0;

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
    verifyKyc: async (req, res, next) => {
        try {
            const { id } = req.params;
            const property = await propertyModel.findByIdAndUpdate(
                id,
                { kycVerified: 'verified' },
                { new: true }
            );

            if (!property) {
                return httpError(next, new Error(responseMessage.PROPERTY_NOT_FOUND), req, 404);
            }

            return httpResponse(req, res, 200, responseMessage.SUCCESS, property);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    rejectKyc: async (req, res, next) => {
        try {
            const { id } = req.params;
            const property = await propertyModel.findByIdAndUpdate(
                id,
                { kycVerified: 'rejected' },
                { new: true }
            );

            if (!property) {
                return httpError(next, new Error(responseMessage.PROPERTY_NOT_FOUND), req, 404);
            }

            return httpResponse(req, res, 200, responseMessage.SUCCESS, property);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    propertyOwners: async (req, res, next) => {
        try {
            const { page = 1, limit = 10, search } = req.query;
            const skip = (Number(page) - 1) * Number(limit);

            const matchQuery = { type: 'property_owner' };

            if (search) {
                const searchRegex = { $regex: search, $options: 'i' };
                matchQuery.$or = [
                    { firstName: searchRegex },
                    { lastName: searchRegex },
                    { email: searchRegex }
                ];
            }

            const pipeline = [
                { $match: matchQuery },
                { $sort: { createdAt: -1 } },
                {
                    $lookup: {
                        from: 'properties',
                        localField: '_id',
                        foreignField: 'ownerId',
                        as: 'properties'
                    }
                },
                {
                    $addFields: {
                        propertyIds: {
                            $map: {
                                input: "$properties",
                                as: "prop",
                                in: "$$prop._id"
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'bookings',
                        localField: 'propertyIds',
                        foreignField: 'propertyId',
                        as: 'bookings'
                    }
                },
                {
                    $addFields: {
                        noOfProperties: { $size: "$properties" },
                        totalBookings: { $size: "$bookings" },
                        totalRevenue: {
                            $reduce: {
                                input: "$bookings",
                                initialValue: 0,
                                in: {
                                    $cond: [
                                        { $eq: ["$$this.status", "confirmed"] },
                                        { $add: ["$$value", "$$this.priceBreakdown.total"] },
                                        "$$value"
                                    ]
                                }
                            }
                        }
                    }
                },
                {
                    $facet: {
                        metadata: [{ $count: "total" }],
                        data: [
                            { $skip: skip },
                            { $limit: Number(limit) },
                            {
                                $project: {
                                    _id: 1,
                                    firstName: 1,
                                    lastName: 1,
                                    email: 1,
                                    phone: 1,
                                    profilePicture: 1,
                                    noOfProperties: 1,
                                    totalBookings: 1,
                                    totalRevenue: 1
                                }
                            }
                        ]
                    }
                }
            ];

            const result = await userModel.aggregate(pipeline);

            const propertyOwners = result[0].data;
            const total = result[0].metadata[0] ? result[0].metadata[0].total : 0;

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                propertyOwners,
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
    getPendingKycProperties: async (req, res, next) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const skip = (Number(page) - 1) * Number(limit);

            const total = await propertyModel.countDocuments({ kycVerified: 'pending' });

            const properties = await propertyModel.find({ kycVerified: 'pending' })
                .populate('ownerId', 'firstName lastName email profilePicture')
                .skip(skip)
                .limit(Number(limit))
                .sort({ createdAt: -1 });

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