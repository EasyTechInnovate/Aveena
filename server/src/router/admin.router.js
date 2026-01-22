import { Router } from 'express';
import adminController from '../controller/Admin/admin.controller.js';
import authentication from '../middleware/authentication.js';

import { getRandomPropertiesSchema, getPropertyByIdSchema } from '../schemas/property.schema.js';
import { createPropertyOwnerSchema } from '../schemas/admin.schema.js';
import validator from '../middleware/validator.js';

const router = Router();

router.use(authentication);

router.get('/dashboard', adminController.dashboard);
router.get('/statistics', adminController.statistics);
router.get('/bookings', validator(getRandomPropertiesSchema, "query"), adminController.bookings);
router.get('/customers', validator(getRandomPropertiesSchema, "query"), adminController.customers);
router.get('/properties', validator(getRandomPropertiesSchema, "query"), adminController.properties);
router.get('/properties/:id', validator(getPropertyByIdSchema, "params"), adminController.getPropertyById);
router.get('/property-owners', validator(getRandomPropertiesSchema, "query"), adminController.propertyOwners);
router.post('/property-owners', validator(createPropertyOwnerSchema, "body"), adminController.createPropertyOwner);
router.patch('/approve-kyc/:id', validator(getPropertyByIdSchema, "params"), adminController.verifyKyc);
router.patch('/reject-kyc/:id', validator(getPropertyByIdSchema, "params"), adminController.rejectKyc);
router.get('/pending-kyc-properties', validator(getRandomPropertiesSchema, "query"), adminController.getPendingKycProperties);

export default router;
