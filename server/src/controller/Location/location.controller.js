import httpResponse from "../../util/httpResponse.js";
import httpError from "../../util/httpError.js";
import responseMessage from "../../constant/responseMessage.js";
import searchLocation from "../../util/searchLocation.js";
import locationModel from "../../models/location.model.js";

export default {
    search: async (req, res, next) => {
        try {
            const { query } = req.query;
            
            const locations = await searchLocation(query);

            return httpResponse(req, res, 200, responseMessage.SUCCESS, locations);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    getPopularLocations: async (req, res, next) => {
        try {

            const locations = await locationModel.find({ isPopular: true }).select('name').limit(10).lean();

            return httpResponse(req, res, 200, responseMessage.SUCCESS, locations);

        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
}
