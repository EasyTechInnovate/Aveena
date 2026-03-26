import httpError from "../util/httpError.js";
import responseMessage from "../constant/responseMessage.js";

export default (req, _res, next) => {
    if (req.user?.role !== 'admin') {
        return httpError(next, new Error(responseMessage.customMessage('Access denied. Admins only.')), req, 403);
    }
    next();
};
