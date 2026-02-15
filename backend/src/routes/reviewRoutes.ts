import { Router } from 'express';
import * as reviewController from '@/controllers/reviewController';
import { authMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { createReviewSchema } from '@/schemas/reviewSchemas';

const router = Router();

router.get('/:wineId/reviews', reviewController.getWineReviews);

router.post(
  '/:wineId/reviews',
  authMiddleware,
  validateBody(createReviewSchema),
  reviewController.createReview,
);

export default router;
