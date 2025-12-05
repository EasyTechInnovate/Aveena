import { Router } from 'express'
import authController from '../controller/Auth/auth.controller.js';
import validator from '../middleware/validator.js';
import authenticationWithoutProfileCheck from '../middleware/authenticationWithoutProfileCheck.js';
import { sendOtpSchema, verifyOtpSchema, completeProfileSchema } from '../schemas/auth.schema.js';


const router = Router();


router.post('/send-otp', validator(sendOtpSchema, "body"), authController.sendOtp);
router.post('/verify-otp', validator(verifyOtpSchema, "body"), authController.verifyOtp);
router.post('/complete-profile', authenticationWithoutProfileCheck, validator(completeProfileSchema, "body"), authController.completeProfile);
router.get('/profile', authenticationWithoutProfileCheck, authController.getProfile);

export default router