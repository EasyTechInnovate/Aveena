import User from '../models/user.model.js';
import httpError from '../util/httpError.js';
import responseMessage from '../constant/responseMessage.js';

export const checkPermission = (section, action) => {
    return async (req, res, next) => {
        try {
            if (!req.user || !req.user.userId) {
                return httpError(next, new Error(responseMessage.AUTH.UNAUTHORIZED), req, 401);
            }

            let user = req.user.data;
            if (!user) {
                user = await User.findById(req.user.userId);
                if (!user) {
                    return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('User')), req, 404);
                }
                req.user.data = user;
            }


            if (user.teamId) {
                const sectionPermissions = user.permissions?.[section];
                if (!sectionPermissions || !sectionPermissions[action]) {
                    return httpError(next, new Error(responseMessage.customMessage(`You do not have permission to ${action} ${section}.`)), req, 403);
                }
            }

            next();
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
}
