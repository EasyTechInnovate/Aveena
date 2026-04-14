import { Router } from "express";
import userController from "../controller/User/user.controller.js";
import validation from "../middleware/validator.js";
import {
    toggleWishlistSchema,
    getWishlistSchema,
    changePasswordSchema,
    updateContactSchema,
    uploadIdentitySchema,
    submitFeedbackSchema,
    paginationSchema
} from "../schemas/user.schema.js";
import authenticate from "../middleware/authentication.js";

const router = Router();

router.use(authenticate);

router.patch('/wishlist/toggle/:propertyId', userController.toggleWishlist);
router.get('/wishlist', validation(getWishlistSchema, "query"), userController.getWishlist);

router.post('/change-password', validation(changePasswordSchema, "body"), userController.changePassword);
router.post('/update-contact', validation(updateContactSchema, "body"), userController.updateContact);

router.post('/identity/upload', validation(uploadIdentitySchema, "body"), userController.uploadIdentity);
router.get('/identity/status', userController.getIdentityStatus);

router.post('/feedback', validation(submitFeedbackSchema, "body"), userController.submitFeedback);

router.get('/my-reviews', validation(paginationSchema, "query"), userController.getMyReviews);

export default router;
