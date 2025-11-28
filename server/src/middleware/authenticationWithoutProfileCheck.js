import config from "../config/config.js"
import responseMessage from "../constant/responseMessage.js"
import httpError from "../util/httpError.js"
import quicker from "../util/quicker.js"

export default async (req, _res, next) => {
    try {
        let accessToken

        if (!accessToken) {
            const authHeader = req.headers.authorization
            if (authHeader?.startsWith('Bearer ')) {
                accessToken = authHeader.substring(7)
            }
        }

        if (!accessToken) {
            return httpError(next, new Error(responseMessage.AUTH.NO_TOKEN_PROVIDED), req, 401)
        }

        const { id, isProfileComplete, role } = quicker.verifyToken(accessToken, config.auth.jwtSecret)

        if(!id) {
            return httpError(next, new Error(responseMessage.AUTH.TOKEN_INVALID), req, 401)
        }

        const user = {
            userId: id,
            isProfileComplete,
            role
        }

        req.user = user
        return next()

    } catch (err) {
        httpError(next, err, req, 500)
    }
}
