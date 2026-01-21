import { Router } from 'express';
import reviewController from '../controller/Review/review.controller.js';
import authentication from '../middleware/authentication.js';

const router = Router();

router.get('/', reviewController.getAllReviews);
router.get('/images', reviewController.getReviewImages);
router.get('/:propertyId', reviewController.getPropertyReviews);
router.patch('/:reviewId/helpful', reviewController.markHelpful);

router.use(authentication);

router.post('/', reviewController.createReview);

export default router;
