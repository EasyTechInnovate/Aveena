import { Router } from 'express';
import walletController from '../controller/Wallet/wallet.controller.js';
import authentication from '../middleware/authentication.js';
import validator from '../middleware/validator.js';
import { walletPaginationSchema } from '../schemas/wallet.schema.js';

const router = Router();

router.use(authentication);

router.get('/', validator(walletPaginationSchema, "query"), walletController.getWallet);

export default router;
