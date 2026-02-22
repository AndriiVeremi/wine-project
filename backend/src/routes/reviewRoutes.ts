import { Router } from 'express';
import * as reviewController from '@/controllers/reviewController';
import { authMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { createReviewSchema } from '@/schemas/reviewSchemas';

const router = Router({ mergeParams: true });

/**
 * @swagger
 * /wines/{wineId}/reviews:
 *   get:
 *     tags: [Reviews]
 *     summary: Get all reviews for a specific wine
 *     parameters:
 *       - in: path
 *         name: wineId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the wine to get reviews for
 *     responses:
 *       200:
 *         description: A list of reviews for the specified wine.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 60d21b4667d0d8992e610c87
 *                   rating:
 *                     type: number
 *                     example: 5
 *                   comment:
 *                     type: string
 *                     example: "Absolutely fantastic!"
 *                   user:
 *                     type: string
 *                     description: "User ID"
 *                     example: "60d21b4667d0d8992e610c88"
 *       404:
 *         description: Wine not found
 *       500:
 *         description: Server error
 */
router.get('/', reviewController.getWineReviews);

/**
 * @swagger
 * /wines/{wineId}/reviews:
 *   post:
 *     tags: [Reviews]
 *     summary: Create a new review for a specific wine
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: wineId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the wine to review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: Rating from 1 to 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 description: Review comment
 *                 example: "This is one of the best wines I have ever tasted."
 *             required:
 *               - rating
 *               - comment
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Wine not found
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, validateBody(createReviewSchema), reviewController.createReview);

export default router;
