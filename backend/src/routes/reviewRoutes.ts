import { Router } from 'express';
import * as reviewController from '@/controllers/reviewController';
import { authMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { createReviewSchema, updateReviewSchema } from '@/schemas/reviewSchemas';
import { isValidId } from '@/middleware/isValidId';

const router = Router({ mergeParams: true });

router.get('/', reviewController.getWineReviews);
router.get('/:reviewId', isValidId('reviewId'), reviewController.getWineReviewById);
router.post('/', authMiddleware, validateBody(createReviewSchema), reviewController.createReview);
router.patch(
  '/:reviewId',
  authMiddleware,
  isValidId('reviewId'),
  validateBody(updateReviewSchema),
  reviewController.updateReview,
);
router.delete('/:reviewId', authMiddleware, isValidId('reviewId'), reviewController.deleteReview);

export default router;
