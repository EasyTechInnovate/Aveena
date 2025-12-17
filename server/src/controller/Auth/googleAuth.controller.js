import { OAuth2Client } from 'google-auth-library';
import userModel from "../../models/user.model.js";
import httpResponse from "../../util/httpResponse.js";
import httpError from "../../util/httpError.js";
import quicker from "../../util/quicker.js";
import responseMessage from "../../constant/responseMessage.js";
import config from "../../config/config.js";

const client = new OAuth2Client(config.google.clientId);

export default {
    googleLogin: async (req, res, next) => {
        try {
            const { idToken, code } = req.body;

            let verifiedPayload;

            if (code) {
                const oauth2Client = new OAuth2Client(
                    config.google.clientId,
                    config.google.clientSecret,
                    'postmessage'
                );

                const { tokens } = await oauth2Client.getToken(code);

                if (!tokens.id_token) {
                    return httpError(next, new Error('Failed to get ID token from authorization code'), req, 400);
                }

                const ticket = await oauth2Client.verifyIdToken({
                    idToken: tokens.id_token,
                    audience: config.google.clientId,
                });

                verifiedPayload = ticket.getPayload();
            } else if (idToken) {
                const ticket = await client.verifyIdToken({
                    idToken: idToken,
                    audience: config.google.clientId,
                });

                verifiedPayload = ticket.getPayload();
            } else {
                return httpError(next, new Error('Either ID token or authorization code is required'), req, 400);
            }

            const googleId = verifiedPayload['sub'];
            const email = verifiedPayload['email'];
            const emailVerified = verifiedPayload['email_verified'];
            const firstName = verifiedPayload['given_name'];
            const lastName = verifiedPayload['family_name'];
            const profilePicture = verifiedPayload['picture'];

            if (!emailVerified) {
                return httpError(next, new Error('Email not verified with Google'), req, 400);
            }

            // Check if user already exists with this Google ID
            let user = await userModel.findOne({ googleId });

            if (!user) {
                // Check if user exists with this email
                user = await userModel.findOne({ email });

                if (user) {
                    // Link Google account to existing user
                    user.googleId = googleId;
                    user.profilePicture = profilePicture;
                    user.authProvider = 'google';
                    await user.save();
                } else {
                    // Create new user
                    user = await userModel.create({
                        googleId,
                        email,
                        firstName,
                        lastName,
                        profilePicture,
                        authProvider: 'google',
                        isProfileComplete: false
                    });
                }
            }

            // Generate JWT token
            const token = quicker.generateToken({
                id: user._id,
                isProfileComplete: user.isProfileComplete
            });

            return httpResponse(req, res, 200, responseMessage.customMessage('Google login successful'), {
                accessToken: token,
                isProfileComplete: user.isProfileComplete,
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profilePicture: user.profilePicture
                }
            });

        } catch (error) {
            console.error('Google Auth Error:', error);
            if (error.message.includes('Token used too late')) {
                return httpError(next, new Error('Token has expired'), req, 401);
            }
            if (error.message.includes('Invalid token')) {
                return httpError(next, new Error('Invalid Google token'), req, 401);
            }
            return httpError(next, error, req, 500);
        }
    },

    googleCallback: async (req, res, next) => {
        try {
            const { code } = req.query;

            if (!code) {
                return httpError(next, new Error('Authorization code is required'), req, 400);
            }

            const { tokens } = await client.getToken({
                code,
                redirect_uri: config.google.redirectUri
            });

            const idToken = tokens.id_token;

            const ticket = await client.verifyIdToken({
                idToken: idToken,
                audience: config.google.clientId,
            });

            const payload = ticket.getPayload();
            const googleId = payload['sub'];
            const email = payload['email'];
            const emailVerified = payload['email_verified'];
            const firstName = payload['given_name'];
            const lastName = payload['family_name'];
            const profilePicture = payload['picture'];

            if (!emailVerified) {
                return httpError(next, new Error('Email not verified with Google'), req, 400);
            }

            let user = await userModel.findOne({ googleId });

            if (!user) {
                user = await userModel.findOne({ email });

                if (user) {
                    user.googleId = googleId;
                    user.profilePicture = profilePicture;
                    user.authProvider = 'google';
                    await user.save();
                } else {
                    user = await userModel.create({
                        googleId,
                        email,
                        firstName,
                        lastName,
                        profilePicture,
                        authProvider: 'google',
                        isProfileComplete: false
                    });
                }
            }

            const token = quicker.generateToken({
                id: user._id,
                isProfileComplete: user.isProfileComplete
            });

            return httpResponse(req, res, 200, responseMessage.customMessage('Google authentication successful'), {
                accessToken: token,
                isProfileComplete: user.isProfileComplete,
            });

        } catch (error) {
            console.error('Google Callback Error:', error);
            return httpError(next, error, req, 500);
        }
    },

    getGoogleAuthUrl: async (req, res, next) => {
        try {
            const oauth2Client = new OAuth2Client(
                config.google.clientId,
                config.google.clientSecret,
                config.google.redirectUri
            );

            const scopes = [
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile'
            ];

            const authUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scopes,
                prompt: 'consent'
            });

            return httpResponse(req, res, 200, responseMessage.customMessage('Google auth URL generated'), {
                authUrl
            });

        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
};
