import { Router } from 'express';
import GrapeController from '@/controllers/grapeController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { createGrapeSchema } from '@/schemas/grapeSchemas';
import upload from '@/middleware/uploadMiddleware';

const router = Router();

/**
 * @swagger
 * /grapes:
 *   get:
 *     tags: [Grapes]
 *     summary: Retrieve a list of all grape varieties
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by grape name
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [red, white, rose]
 *         description: Filter by grape type
 *     responses:
 *       200:
 *         description: A list of grapes.
 *       500:
 *         description: Server error
 */
router.get('/', GrapeController.getGrapes);

/**
 * @swagger
 * /grapes:
 *   post:
 *     tags: [Grapes]
 *     summary: Add a new grape variety
 *     security:
 *       - bearerAuth: []
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
 *               type:
 *                 type: string
 *                 enum: [red, white, rose]
 *             required:
 *               - name
 *               - type
 *     responses:
 *       201:
 *         description: Grape added successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['ADMIN', 'WINERY_OWNER']),
  validateBody(createGrapeSchema),
  GrapeController.addGrape,
);

/**
 * @swagger
 * /grapes/{grapeId}/images:
 *   patch:
 *     tags: [Grapes]
 *     summary: Update grape images
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: grapeId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Images updated successfully
 */
router.patch(
  '/:id/images',
  authMiddleware,
  roleMiddleware(['ADMIN', 'WINERY_OWNER']),
  upload.array('images', 5), // Limit to 5 images
  GrapeController.updateGrapeImages,
);

export default router;
