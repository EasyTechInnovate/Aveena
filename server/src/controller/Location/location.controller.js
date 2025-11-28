import httpResponse from "../../util/httpResponse.js";
import httpError from "../../util/httpError.js";
import responseMessage from "../../constant/responseMessage.js";
import searchLocation from "../../util/searchLocation.js";

export default {
    search: async (req, res, next) => {
        try {
            const { query } = req.query;
            
            const locations = await searchLocation(query);

            return httpResponse(req, res, 200, responseMessage.SUCCESS, locations);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
}
