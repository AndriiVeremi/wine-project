import { Router } from 'express';
import * as reviewController from '@/controllers/reviewController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import { isValidId } from '@/middleware/isValidId';

const router = Router();

router.get('/', authMiddleware, roleMiddleware(['ADMIN']), reviewController.getAllReviews);
router.delete(
  '/:reviewId',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  isValidId('reviewId'),
  reviewController.deleteReview,
);

export default router;
