import { Router } from 'express';
import * as tourController from '@/controllers/tourController';
import { isValidId } from '@/middleware/isValidId';
import validateBody from '@/middleware/validateBody';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import { createTourSchema, updateTourSchema } from '@/schemas/tourSchemas';

const router = Router();

/**
 * @swagger
 * /tours:
 *   get:
 *     tags: [Tours]
 *     summary: Retrieve all tours with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of tours with pagination metadata.
 *       500:
 *         description: Server error
 */
router.get('/', tourController.getAllTours);

/**
 * @swagger
 * /tours/winery/{wineryId}:
 *   get:
 *     tags: [Tours]
 *     summary: Get all tours for a specific winery
 *     parameters:
 *       - in: path
 *         name: wineryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the winery
 *     responses:
 *       200:
 *         description: A list of tours for the winery.
 *       404:
 *         description: Winery not found
 *       500:
 *         description: Server error
 */
router.get('/winery/:wineryId', isValidId('wineryId'), tourController.getToursByWinery);

/**
 * @swagger
 * /tours/{tourId}:
 *   get:
 *     tags: [Tours]
 *     summary: Get a single tour by ID
 *     parameters:
 *       - in: path
 *         name: tourId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tour to retrieve
 *     responses:
 *       200:
 *         description: Tour data.
 *       404:
 *         description: Tour not found
 *       500:
 *         description: Server error
 */
router.get('/:id', isValidId(), tourController.getTourById);

/**
 * @swagger
 * /tours:
 *   post:
 *     tags: [Tours]
 *     summary: Create a new tour
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               winery:
 *                 type: string
 *                 description: ID of the winery
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: number
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               groupSize:
 *                 type: object
 *                 properties:
 *                   min:
 *                     type: number
 *                   max:
 *                     type: number
 *             required:
 *               - winery
 *               - name
 *               - groupSize
 *     responses:
 *       201:
 *         description: Tour created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (User is not a WINERY_OWNER or ADMIN)
 *       500:
 *         description: Server error
 */
router.post(
  '/',
  authMiddleware,
  validateBody(createTourSchema),
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  tourController.createTour,
);

/**
 * @swagger
 * /tours/{tourId}:
 *   patch:
 *     tags: [Tours]
 *     summary: Update a tour by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tourId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tour to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: number
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               groupSize:
 *                 type: object
 *                 properties:
 *                   min:
 *                     type: number
 *                   max:
 *                     type: number
 *     responses:
 *       200:
 *         description: Tour updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (User is not the owner or ADMIN)
 *       404:
 *         description: Tour not found
 *       500:
 *         description: Server error
 */
router.patch(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  validateBody(updateTourSchema),
  tourController.updateTour,
);

/** id
 * @swagger
 * /tours/{tourId}:
 *   delete:
 *     tags: [Tours]
 *     summary: Delete a tour by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tourId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tour to delete
 *     responses:
 *       204:
 *         description: Tour deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (User is not the owner or ADMIN)
 *       404:
 *         description: Tour not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  tourController.deleteTour,
);

export default router;
