import { Router } from 'express'
import authController from '../controller/Auth/auth.controller.js';
import passwordAuthController from '../controller/Auth/passwordAuth.controller.js';
import googleAuthController from '../controller/Auth/googleAuth.controller.js';
import validator from '../middleware/validator.js';
import authenticationWithoutProfileCheck from '../middleware/authenticationWithoutProfileCheck.js';
import { sendOtpSchema, verifyOtpSchema, completeProfileSchema } from '../schemas/auth.schema.js';


const router = Router();


router.post('/send-otp', validator(sendOtpSchema, "body"), authController.sendOtp);
router.post('/verify-otp', validator(verifyOtpSchema, "body"), authController.verifyOtp);
router.post('/login-password', passwordAuthController.loginWithPassword);


router.get('/google/url', googleAuthController.getGoogleAuthUrl);
router.get('/google/callback', googleAuthController.googleCallback);
router.post('/google/login', googleAuthController.googleLogin);


router.post('/complete-profile', authenticationWithoutProfileCheck, validator(completeProfileSchema, "body"), authController.completeProfile);
router.get('/profile', authenticationWithoutProfileCheck, authController.getProfile);

export default router