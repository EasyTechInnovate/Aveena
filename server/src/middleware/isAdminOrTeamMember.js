import httpError from "../util/httpError.js";
import responseMessage from "../constant/responseMessage.js";

export default (req, _res, next) => {
    const { role } = req.user || {};
    if (role !== 'admin' && role !== 'team_member') {
        return httpError(next, new Error(responseMessage.customMessage('Access denied.')), req, 403);
    }
    next();
};
