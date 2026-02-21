import { Router } from 'express';
import mediaController from '../controller/Media/media.controller.js';
import authentication from '../middleware/authentication.js';

const router = Router();

router.use(authentication);

router.get('/auth', mediaController.auth);

export default router;
