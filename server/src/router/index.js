import { Router } from 'express'
import healthController from '../controller/Health/health.controller.js'
import propertyRouter from './property.router.js';
import authRouter from './auth.router.js';
import locationRouter from './location.router.js';
import bookingRouter from './booking.router.js';
import couponRouter from './coupon.router.js';
import propertyOwnerRouter from './propertyOwner.router.js';
import adminRouter from './admin.router.js';
import mediaRouter from './media.router.js';
import reviewRouter from './review.router.js';
import userRouter from './user.router.js';
import enquiryRouter from './enquiry.router.js';
import teamRouter from './team.router.js';
import helpCenterRouter from './helpCenter.router.js';

const router = Router()

router.route('/self').get(healthController.self)
router.route('/health').get(healthController.health)


router.use('/auth', authRouter)
router.use('/properties', propertyRouter);
router.use('/locations', locationRouter);
router.use('/bookings', bookingRouter);
router.use('/coupons', couponRouter);
router.use('/property-owner', propertyOwnerRouter);
router.use('/admin', adminRouter);
router.use('/media', mediaRouter);
router.use('/reviews', reviewRouter);
router.use('/user', userRouter);
router.use('/enquiries', enquiryRouter);
router.use('/team', teamRouter);
router.use('/help-center', helpCenterRouter);

export default router