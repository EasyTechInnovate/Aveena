import responseMessage from "../../constant/responseMessage.js";
import bookedDatesSchema from "../../models/bookedDates.schema.js";
import propertyModel from "../../models/property.model.js";
import propertyDetailsModel from "../../models/propertyDetails.model.js";
import roomModel from "../../models/room.model.js";
import fetchDetailedLocation from "../../util/fetchDetailedLocation.js";
import getLocationIds from "../../util/getLocationIds.js";
import httpError from "../../util/httpError.js"
import httpResponse from "../../util/httpResponse.js";
import maintainLocationHierarchy from "../../util/maintainLocationHierarchy.js";



export default {
    createProperty: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { propertyName, type, address, location, basePrice, totalUnits, amenties, description, coverImage, capacity, noOfRooms, noOfBaths, rooms } = req.body;

            if(type === 'hotel' && rooms.length === 0) {
                return httpError(next, new Error(responseMessage.customMessage('Rooms are required.')), req, 400);

            }

            const detailedLocation = await fetchDetailedLocation(location.latitude, location.longitude);
            const locationDetails = await maintainLocationHierarchy(detailedLocation);

            const property = await propertyModel.create({
                ownerId: userId,
                propertyName,
                type,
                address: {
                    fullAddress: address.fullAddress,
                    zipCode: address.zipCode
                },
                location: {
                    latitude: detailedLocation.lat,
                    longitude: detailedLocation.lng
                },
                basePrice,
                capacity: {
                    adults: capacity.adults,
                    childrens: capacity.childrens
                },
                noOfRooms,
                noOfBaths,
                totalUnits,
                amenties,
                description,
                coverImage,
                locationId: locationDetails.locationId
            })

            if(type === 'hotel') {
                for(const room of rooms) {
                    await roomModel.create({
                        propertyId: property._id,
                        title: room.title,
                        description: room.description,
                        basePrice: room.basePrice,
                        totalUnits: room.totalUnits,
                        amenties: room.amenties,
                        capacity: {
                            adults: room.capacity.adults,
                            childrens: room.capacity.childrens
                        }
                    })
                }
            }

            return httpResponse(req, res, 201, responseMessage.SUCCESS, {
                propertyId: property._id
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    updatePropertyDetails: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { propertyId, propertyMedia, spaces, meals, villaLocationDescription, experiences, faqs } = req.body;

            const property = await propertyModel.findOne({ _id: propertyId, ownerId: userId });

            if (!property) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Property')), req, 404);
            }

            let propertyDetails = await propertyDetailsModel.findOne({ propertyId });

            if (propertyDetails) {
                if (propertyMedia !== undefined) propertyDetails.propertyMedia = propertyMedia;
                if (spaces !== undefined) propertyDetails.spaces = spaces;
                if (meals !== undefined) propertyDetails.meals = meals;
                if (villaLocationDescription !== undefined) propertyDetails.villaLocationDescription = villaLocationDescription;
                if (experiences !== undefined) propertyDetails.experiences = experiences;
                if (faqs !== undefined) propertyDetails.faqs = faqs;
                await propertyDetails.save();
            } else {
                propertyDetails = await propertyDetailsModel.create({
                    propertyId,
                    propertyMedia: propertyMedia || [],
                    spaces: spaces || [],
                    meals,
                    villaLocationDescription,
                    experiences,
                    faqs: faqs || []
                });
            }

            const isDetailsComplete = propertyDetails.propertyMedia.length > 0 &&
                                      propertyDetails.spaces.length > 0 &&
                                      propertyDetails.villaLocationDescription;

            if (isDetailsComplete && !property.isActive) {
                property.isActive = true;
                await property.save();
            }

            return httpResponse(req, res, 200, responseMessage.UPDATED, null);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    updateProperty: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { propertyId, propertyName, address, location, basePrice, totalUnits, amenties, description, coverImage, capacity, noOfRooms, noOfBaths } = req.body;

            const property = await propertyModel.findOne({ _id: propertyId, ownerId: userId });

            if (!property) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Property')), req, 404);
            }

            if (propertyName !== undefined) property.propertyName = propertyName;
            if (basePrice !== undefined) property.basePrice = basePrice;
            if (totalUnits !== undefined) property.totalUnits = totalUnits;
            if (amenties !== undefined) property.amenties = amenties;
            if (description !== undefined) property.description = description;
            if (coverImage !== undefined) property.coverImage = coverImage;
            if (noOfRooms !== undefined) property.noOfRooms = noOfRooms;
            if (noOfBaths !== undefined) property.noOfBaths = noOfBaths;

            if (address !== undefined) {
                if (address.fullAddress !== undefined) property.address.fullAddress = address.fullAddress;
                if (address.zipCode !== undefined) property.address.zipCode = address.zipCode;
            }

            if (capacity !== undefined) {
                if (capacity.adults !== undefined) property.capacity.adults = capacity.adults;
                if (capacity.childrens !== undefined) property.capacity.childrens = capacity.childrens;
            }

            if (location !== undefined && location.latitude !== undefined && location.longitude !== undefined) {
                const detailedLocation = await fetchDetailedLocation(location.latitude, location.longitude);
                const locationDetails = await maintainLocationHierarchy(detailedLocation);
                property.location.latitude = detailedLocation.lat;
                property.location.longitude = detailedLocation.lng;
                property.locationId = locationDetails.locationId;
            }

            await property.save();

            return httpResponse(req, res, 200, responseMessage.UPDATED, null);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    getProperties: async (req, res, next) => {
        try {
            const { whereTo, checkIn, checkOut, adults = 1, childrens = 0, rooms = 1, page = 1, limit = 10 } = req.query;
            
            const trimmedWhereTo = whereTo.split(",")[0].trim();
            const locationIds = await getLocationIds(trimmedWhereTo);

            if(locationIds.length === 0) {
                return httpResponse(req, res, 200, responseMessage.SUCCESS, []);
            };
            
            const skip = (Number(page) - 1) * Number(limit);

            const pipeline = [
                {
                    $match: {
                        locationId: {
                            $in: locationIds
                        },
                        
                    }
                },
                {
                    $match: {
                        "capacity.adults": {
                            $gte: Number(adults)
                        },
                        "capacity.childrens": {
                            $gte: Number(childrens)
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'bookeddates',
                        let: { propertyId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$entityId", "$propertyId"] },
                                            { $eq: ["$entityType", "property"] },
                                            { $gte: ["$date", new Date(checkIn)] },
                                            { $lte: ["$date", new Date(checkOut)] }
                                        ]
                                    }
                                }
                            }
                                                                      
                        ],  
                        as: 'bookings'
                    }
                }, 
                {
                    $addFields: {
                        bookedUnits: {
                            $sum: '$bookings.unitsBooked'
                        }
                    }
                },
                {
                    $addFields: {
                        availableUnits: {
                            $subtract: ["$totalUnits", "$bookedUnits"]
                        }
                    }
                }, 
                {
                    $match: {
                        $expr: {
                            $gte: ["$availableUnits", Number(rooms) ?? 1]
                        }
                    }
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

            const data = await propertyModel.aggregate(pipeline);
            
            return httpResponse(req, res, 200, responseMessage.SUCCESS, data);

        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    getPropertyById: async (req, res, next) => {
        try {
            const { id } = req.params;

            if(!id) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Property')), req, 404);
            }

            const property = await propertyModel.findById(id);

            if (!property) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Property')), req, 404);
            }

            const propertyDetails = await propertyDetailsModel.findOne({ propertyId: id });
            const rooms = await roomModel.find({ propertyId: id });

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                property,
                propertyDetails,
                rooms
            });
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    toggleActive: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { propertyId } = req.body;

            const property = await propertyModel.findOne({ _id: propertyId, ownerId: userId });

            if (!property) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Property')), req, 404);
            }

            if (!property.isActive) {
                const propertyDetails = await propertyDetailsModel.findOne({ propertyId });

                if (!propertyDetails) {
                    return httpError(next, new Error(responseMessage.customMessage('Complete property details before activating')), req, 400);
                }

                const isDetailsComplete = propertyDetails.propertyMedia.length > 0 &&
                                          propertyDetails.spaces.length > 0 &&
                                          propertyDetails.villaLocationDescription;

                if (!isDetailsComplete) {
                    return httpError(next, new Error(responseMessage.customMessage('Complete property details before activating')), req, 400);
                }
            }

            property.isActive = !property.isActive;
            await property.save();

            return httpResponse(req, res, 200, responseMessage.UPDATED, null);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
}