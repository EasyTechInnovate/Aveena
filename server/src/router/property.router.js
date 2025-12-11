import { Router } from 'express';
import propertyController from '../controller/Property/property.controller.js';
import validator from '../middleware/validator.js';
import { createPropertySchema, getPropertiesSchema, propertyDetailsSchema, toggleActiveSchema, getPropertyByIdSchema, updatePropertySchema, getRandomPropertiesSchema } from '../schemas/property.schema.js';
import authentication from '../middleware/authentication.js';

const router = Router();

router.use(authentication);

router.post('/', validator(createPropertySchema, "body"), propertyController.createProperty);
router.get('/', validator(getPropertiesSchema, "query"), propertyController.getProperties);
router.get('/random', validator(getRandomPropertiesSchema, "query"), propertyController.getRandomProperties);
router.get('/:id', propertyController.getPropertyById);
router.put('/details', validator(propertyDetailsSchema, "body"), propertyController.updatePropertyDetails);
router.put('/', validator(updatePropertySchema, "body"), propertyController.updateProperty);
router.patch('/toggle-active', validator(toggleActiveSchema, "body"), propertyController.toggleActive);

export default router;