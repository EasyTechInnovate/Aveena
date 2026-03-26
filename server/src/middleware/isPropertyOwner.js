import httpError from "../util/httpError.js";
import responseMessage from "../constant/responseMessage.js";

export default (req, _res, next) => {
    if (req.user?.role !== 'property_owner') {
        return httpError(next, new Error(responseMessage.customMessage('Access denied. Property owners only.')), req, 403);
    }
    next();
};
