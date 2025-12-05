import { Router } from "express";
import locationController from "../controller/Location/location.controller.js";
import validator from "../middleware/validator.js";
import { searchLocationSchema } from "../schemas/location.schema.js";

const router = Router();

router.get('/search', validator(searchLocationSchema, "query"), locationController.search);
router.get('/popular', locationController.getPopularLocations)

export default router;