import ImageKit from "imagekit";
import config from "../../config/config.js";
import httpResponse from "../../util/httpResponse.js";
import httpError from "../../util/httpError.js";
import responseMessage from "../../constant/responseMessage.js";

const imagekit = new ImageKit({
    publicKey: config.imageKit.publicKey,
    privateKey: config.imageKit.privateKey,
    urlEndpoint: config.imageKit.urlEndpoint
});

export default {
    auth: async (req, res, next) => {
        try {
            const result = imagekit.getAuthenticationParameters();
            return httpResponse(req, res, 200, responseMessage.SUCCESS, result);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
}
