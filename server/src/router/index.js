import { Router } from 'express'
import healthController from '../controller/Health/health.controller.js'
import propertyRouter from './property.router.js';
import authRouter from './auth.router.js';
import locationRouter from './location.router.js';

const router = Router()

router.route('/self').get(healthController.self)
router.route('/health').get(healthController.health)


router.use('/auth', authRouter)
router.use('/properties', propertyRouter);
router.use('/locations', locationRouter);

export default router