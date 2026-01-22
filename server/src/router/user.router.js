import { Router } from "express";
import userController from "../controller/User/user.controller.js";
import validation from "../middleware/validator.js";
import { toggleWishlistSchema, getWishlistSchema } from "../schemas/user.schema.js";
import authenticate from "../middleware/authentication.js";

const router = Router();

router.use(authenticate);

router.patch('/wishlist/toggle/:propertyId', userController.toggleWishlist);
router.get('/wishlist', validation(getWishlistSchema, "query"), userController.getWishlist);

export default router;
