import { Router } from 'express';
import * as reviewController from '@/controllers/reviewController';
import { authMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { createReviewSchema } from '@/schemas/reviewSchemas';
import { isValidId } from '@/middleware/isValidId';

const router = Router({ mergeParams: true });

/**
 * @swagger
 * /wines/{id}/reviews:
 *   get:
 *     tags: [Reviews]
 *     summary: Get reviews for target
 * /wineries/{id}/reviews:
 *   get:
 *     tags: [Reviews]
 *     summary: Get reviews for target
 */
router.get('/', reviewController.getReviews);

/**
 * @swagger
 * /wines/{id}/reviews:
 *   post:
 *     tags: [Reviews]
 *     summary: Add review
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authMiddleware, validateBody(createReviewSchema), reviewController.createReview);

/**
 * @swagger
 * /wines/{id}/reviews/{reviewId}:
 *   delete:
 *     tags: [Reviews]
 *     summary: Delete review
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:reviewId', authMiddleware, isValidId('reviewId'), reviewController.deleteReview);

export default router;
