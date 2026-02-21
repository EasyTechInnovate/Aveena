import userModel from "../../models/user.model.js";
import httpResponse from "../../util/httpResponse.js";
import httpError from "../../util/httpError.js";
import quicker from "../../util/quicker.js";
import responseMessage from "../../constant/responseMessage.js";
import { sendEmail, sendSms } from "../../util/sendOtp.js";

export default {
    sendOtp: async (req, res, next) => {
        try {
            const { email, phone } = req.body;

            const query = [];
            if (email) {
                query.push({ email });
            }
            if (phone?.number) {
                query.push({ 'phone.number': phone.number });
            }

            let user = await userModel.findOne({ $or: query });

            const code = quicker.generateOtp();
            const hashedCode = quicker.hashOtp(code);

            const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

            if (!user) {
                const userData = {};
                if (email) {
                    userData.email = email;
                }
                if (phone) {
                    userData.phone = {
                        number: phone.number,
                        countryCode: phone.countryCode
                    };
                }
                user = await userModel.create(userData);
            }

            user.verification.code = hashedCode;
            user.verification.expiresAt = expiresAt;

            await user.save();

            if (user.phone?.number) {
                await sendSms((user.phone.countryCode.replace('+', '') + user.phone.number), code);
            }

            if (user.email) {
                await sendEmail(user.email, code);
            }


            return httpResponse(req, res, 200, responseMessage.customMessage('OTP sent successfully'), null);

        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    verifyOtp: async (req, res, next) => {
        try {
            const { email, phone, verificationCode } = req.body;

            const query = [];
            if (email) {
                query.push({ email });
            }
            if (phone?.number) {
                query.push({ 'phone.number': phone.number });
            }

            const user = await userModel.findOne({ $or: query });

            if (!user) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('User')), req, 404);
            }

            // if(user.verification.expiresAt < new Date()) {
            //     return httpError(next, new Error(responseMessage.ERROR.OTP_EXPIRED), req, 400);
            // }

            // if(!quicker.compareOtp(verificationCode, user.verification.code)) {
            //     return httpError(next, new Error(responseMessage.customMessage('Invalid OTP')), req, 400);
            // }

            const token = quicker.generateToken({
                id: user._id,
                isProfileComplete: user.isProfileComplete
            });

            return httpResponse(req, res, 200, responseMessage.customMessage('OTP verified successfully'), {
                accessToken: token,
                isProfileComplete: user.isProfileComplete
            });

        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    completeProfile: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { firstName, lastName, email, phone, dateOfBirth, nationality, gender, address } = req.body;

            const user = await userModel.findById(userId);

            if (!user) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('User')), req, 404);
            }

            await userModel.find({
                _id: { $ne: userId },
                $or: [
                    { email: email },
                    { 'phone.number': phone.number }
                ]
            }).then(existingUsers => {
                existingUsers.forEach(existingUser => {
                    if (existingUser.email === email) {
                        throw new Error(responseMessage.ERROR.ALREADY_EXISTS('Email'));
                    }
                    if (existingUser.phone.number === phone.number) {
                        throw new Error(responseMessage.ERROR.ALREADY_EXISTS('Phone number'));
                    }
                });
            });

            user.firstName = firstName;
            user.lastName = lastName;
            user.email = user.email || email;
            user.phone.countryCode = user.phone.countryCode || phone.countryCode;
            user.phone.number = user.phone.number || phone.number;

            if (dateOfBirth) {
                user.dateOfBirth = new Date(dateOfBirth);
            }

            if (nationality) {
                user.nationality = nationality;
            }

            if (gender) {
                user.gender = gender;
            }

            if (address) {
                if (address.country) user.address.country = address.country;
                if (address.city) user.address.city = address.city;
                if (address.state) user.address.state = address.state;
                if (address.aptorsuiteorfloor) user.address.aptorsuiteorfloor = address.aptorsuiteorfloor;
                if (address.fullAddress) user.address.fullAddress = address.fullAddress;
                if (address.zipCode) user.address.zipCode = address.zipCode;
            }

            user.isProfileComplete = true;

            await user.save();

            const token = quicker.generateToken({
                id: user._id,
                isProfileComplete: user.isProfileComplete
            })

            return httpResponse(req, res, 200, responseMessage.customMessage('Profile completed successfully'), {
                accessToken: token
            });

        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },
    getProfile: async (req, res, next) => {
        try {
            const { userId } = req.user;

            const user = await userModel.findById(userId)
                .select('-verification -createdAt -updatedAt -__v')
                .lean();

            if (!user) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('User')), req, 404);
            }

            return httpResponse(req, res, 200, responseMessage.customMessage('Profile fetched successfully'), user);

        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
}