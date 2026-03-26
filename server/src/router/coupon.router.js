import { Router } from 'express';
import couponController from '../controller/Coupon/coupon.controller.js';
import validator from '../middleware/validator.js';
import { createCouponSchema, applyCouponSchema, toggleCouponStatusSchema } from '../schemas/coupon.schema.js';
import authentication from '../middleware/authentication.js';
import isAdminOrTeamMember from '../middleware/isAdminOrTeamMember.js';
import { checkPermission } from '../middleware/authorization.js';

const router = Router();

router.use(authentication);

router.post('/', isAdminOrTeamMember, checkPermission('offer', 'edit'), validator(createCouponSchema, "body"), couponController.createCoupon);
router.post('/apply', validator(applyCouponSchema, "body"), couponController.applyCoupon);
router.get('/', couponController.getAllCoupons);
router.patch('/toggle-status', isAdminOrTeamMember, checkPermission('offer', 'edit'), validator(toggleCouponStatusSchema, "body"), couponController.toggleCouponStatus);

export default router;
