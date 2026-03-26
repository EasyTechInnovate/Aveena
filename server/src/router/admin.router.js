import { Router } from 'express';
import adminController from '../controller/Admin/admin.controller.js';
import authentication from '../middleware/authentication.js';
import isAdminOrTeamMember from '../middleware/isAdminOrTeamMember.js';
import { checkPermission } from '../middleware/authorization.js';

import propertyController from '../controller/Property/property.controller.js';
import { getRandomPropertiesSchema, getPropertyByIdSchema, toggleActiveSchema } from '../schemas/property.schema.js';
import { createPropertyOwnerSchema } from '../schemas/admin.schema.js';
import validator from '../middleware/validator.js';

const router = Router();

router.use(authentication);
router.use(isAdminOrTeamMember);

router.get('/dashboard', checkPermission('dashboard', 'read'), adminController.dashboard);
router.get('/statistics', checkPermission('analytics', 'read'), adminController.statistics);

router.get('/bookings', checkPermission('allBookings', 'read'), validator(getRandomPropertiesSchema, "query"), adminController.bookings);

router.get('/customers', checkPermission('allCustomers', 'read'), validator(getRandomPropertiesSchema, "query"), adminController.customers);

router.get('/properties', checkPermission('allProperty', 'read'), validator(getRandomPropertiesSchema, "query"), adminController.properties);
router.get('/properties/:id', checkPermission('allProperty', 'read'), validator(getPropertyByIdSchema, "params"), adminController.getPropertyById);
router.patch('/properties/toggle-active', checkPermission('allProperty', 'edit'), validator(toggleActiveSchema, "body"), adminController.togglePropertyActive);
router.delete('/properties/:id', checkPermission('allProperty', 'edit'), validator(getPropertyByIdSchema, "params"), propertyController.deleteProperty);

router.get('/property-owners', checkPermission('propertyOwner', 'read'), validator(getRandomPropertiesSchema, "query"), adminController.propertyOwners);
router.get('/property-owners/:id', checkPermission('propertyOwner', 'read'), validator(getPropertyByIdSchema, "params"), adminController.getPropertyOwnerById);
router.get('/property-owners/:id/properties', checkPermission('propertyOwner', 'read'), validator(getPropertyByIdSchema, "params"), validator(getRandomPropertiesSchema, "query"), adminController.getPropertiesByOwnerId);
router.post('/property-owners', checkPermission('propertyOwner', 'edit'), validator(createPropertyOwnerSchema, "body"), adminController.createPropertyOwner);

router.get('/pending-kyc-properties', checkPermission('pendingKYC', 'read'), validator(getRandomPropertiesSchema, "query"), adminController.getPendingKycProperties);
router.patch('/approve-kyc/:id', checkPermission('pendingKYC', 'edit'), validator(getPropertyByIdSchema, "params"), adminController.verifyKyc);
router.patch('/reject-kyc/:id', checkPermission('pendingKYC', 'edit'), validator(getPropertyByIdSchema, "params"), adminController.rejectKyc);

export default router;
