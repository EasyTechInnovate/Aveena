import userModel from "../../models/user.model.js";
import httpResponse from "../../util/httpResponse.js";
import httpError from "../../util/httpError.js";
import quicker from "../../util/quicker.js";
import responseMessage from "../../constant/responseMessage.js";

export default {
    loginWithPassword: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return httpError(next, new Error(responseMessage.customMessage('Email and password are required.')), req, 400);
            }

            const user = await userModel.findOne({ email }).select('+password');

            if (!user) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('User')), req, 404);
            }

            if (!user.password) {
                return httpError(next, new Error(responseMessage.customMessage('Password not set for this account. Please login via OTP or Social Auth.')), req, 400);
            }

            const isPasswordValid = quicker.comparePassword(password, user.password);

            if (!isPasswordValid) {
                return httpError(next, new Error(responseMessage.customMessage('Invalid email or password.')), req, 401);
            }

            const token = quicker.generateToken({
                id: user._id,
                isProfileComplete: user.isProfileComplete
            });

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                accessToken: token,
                isProfileComplete: user.isProfileComplete
            });

        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
}
