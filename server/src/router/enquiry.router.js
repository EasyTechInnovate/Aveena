import { Router } from "express";
import enquiryController from "../controller/Enquiry/enquiry.controller.js";
import validation from "../middleware/validator.js";
import { createEnquirySchema, getEnquiriesSchema } from "../schemas/enquiry.schema.js";

const router = Router();

router.post('/', validation(createEnquirySchema, "body"), enquiryController.createEnquiry);
router.get('/', validation(getEnquiriesSchema, "query"), enquiryController.getEnquiries);

export default router;
