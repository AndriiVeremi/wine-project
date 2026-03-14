import { Router } from 'express';
import * as reviewController from '@/controllers/reviewController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import { isValidId } from '@/middleware/isValidId';

const router = Router();

/**
 * @swagger
 * /reviews:
 *   get:
 *     tags: [Admin]
 *     summary: Get all reviews for moderation (Admin only)
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authMiddleware, roleMiddleware(['ADMIN']), reviewController.getAllReviews);

/**
 * @swagger
 * /reviews/{reviewId}:
 *   delete:
 *     tags: [Admin]
 *     summary: Delete any review (Admin only)
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  '/:reviewId',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  isValidId('reviewId'),
  reviewController.deleteReview,
);

export default router;
