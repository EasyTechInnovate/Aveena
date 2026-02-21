import Enquiry from "../../models/enquiry.model.js";
import httpError from "../../util/httpError.js";
import httpResponse from "../../util/httpResponse.js";
import responseMessage from "../../constant/responseMessage.js";

export default {
    createEnquiry: async (req, res, next) => {
        try {
            const { fullName, phoneNumber, hotelName, cityName } = req.body;

            const enquiry = await Enquiry.create({
                fullName,
                phoneNumber,
                hotelName,
                cityName
            });

            return httpResponse(req, res, 201, responseMessage.CREATED, enquiry);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    getEnquiries: async (req, res, next) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const skip = (Number(page) - 1) * Number(limit);

            const enquiries = await Enquiry.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit));

            const total = await Enquiry.countDocuments();

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                enquiries,
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
