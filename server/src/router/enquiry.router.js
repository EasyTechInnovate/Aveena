import { Router } from "express";
import enquiryController from "../controller/Enquiry/enquiry.controller.js";
import validation from "../middleware/validator.js";
import { createEnquirySchema, getEnquiriesSchema } from "../schemas/enquiry.schema.js";
import authentication from "../middleware/authentication.js";
import isAdminOrTeamMember from "../middleware/isAdminOrTeamMember.js";
import { checkPermission } from "../middleware/authorization.js";

const router = Router();

router.post('/', validation(createEnquirySchema, "body"), enquiryController.createEnquiry);
router.get('/', authentication, isAdminOrTeamMember, checkPermission('dashboard', 'read'), validation(getEnquiriesSchema, "query"), enquiryController.getEnquiries);

export default router;
