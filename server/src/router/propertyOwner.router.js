import { Router } from 'express';
import propertyOwnerController from '../controller/PropertyOwner/propertyOwner.controller.js';
import authentication from '../middleware/authentication.js';
import validator from '../middleware/validator.js';
import { getRandomPropertiesSchema, getPropertyByIdSchema } from '../schemas/property.schema.js';

const router = Router();

router.use(authentication);

router.get('/dashboard', propertyOwnerController.dashboard);
router.get('/bookings', validator(getRandomPropertiesSchema, "query"), propertyOwnerController.bookings);
router.get('/bookings/:id', propertyOwnerController.getBookingById);
router.get('/properties', validator(getRandomPropertiesSchema, "query"), propertyOwnerController.properties);
router.get('/properties/:id', validator(getPropertyByIdSchema, "params"), propertyOwnerController.getPropertyById);
router.get('/statistics', propertyOwnerController.statistics);

export default router;
