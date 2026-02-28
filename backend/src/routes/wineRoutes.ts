import { Router } from 'express';
import * as wineController from '@/controllers/wineController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { createWineSchema, updateWineSchema } from '@/schemas/wineSchemas';
import { isValidId } from '@/middleware/isValidId';
import reviewRoutes from '@/routes/reviewRoutes';

const router = Router();

/**
 * @swagger
 * /wines:
 *   get:
 *     tags: [Wines]
 *     summary: Retrieve a list of wines with optional filters and pagination
 *     parameters:
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *           enum: [red, white, rose, orange]
 *         description: Filter by wine color
 *       - in: query
 *         name: sweetness
 *         schema:
 *           type: string
 *           enum: [dry, semi-dry, semi-sweet, sweet]
 *         description: Filter by sweetness level
 *       - in: query
 *         name: grape
 *         schema:
 *           type: string
 *         description: Filter by grape variety (ID)
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filter by country
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Filter by region
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
 *         description: A list of wines with pagination metadata.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 wines:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b4667d0d8992e610c85
 *                       name:
 *                         type: string
 *                         example: Château Margaux
 *                       vintage:
 *                         type: integer
 *                         example: 2015
 *                       color:
 *                         type: string
 *                         enum: [red, white, rose, orange]
 *                       sweetness:
 *                         type: string
 *                         enum: [dry, semi-dry, semi-sweet, sweet]
 *                       price:
 *                         type: number
 *                         example: 500
 *                 totalCount:
 *                   type: integer
 *                   example: 100
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *       500:
 *         description: Server error
 */
router.get('/', wineController.getAllWines);

/**
 * @swagger
 * /wines:
 *   post:
 *     tags: [Wines]
 *     summary: Create a new wine
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
 *                 example: New Amazing Wine
 *               winery:
 *                 type: string
 *                 description: ID of the winery
 *                 example: 60d21b4667d0d8992e610c85
 *               vintage:
 *                 type: integer
 *                 example: 2023
 *               grape:
 *                 type: string
 *                 description: ID of the grape variety
 *                 example: 60d21b4667d0d8992e610c86
 *               color:
 *                 type: string
 *                 enum: [red, white, rose, orange]
 *                 example: red
 *               sweetness:
 *                 type: string
 *                 enum: [dry, semi-dry, semi-sweet, sweet]
 *                 example: dry
 *               price:
 *                 type: number
 *                 example: 150
 *             required:
 *               - name
 *               - winery
 *               - vintage
 *               - grape
 *               - color
 *               - sweetness
 *               - price
 *     responses:
 *       201:
 *         description: Wine created successfully
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
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  validateBody(createWineSchema),
  wineController.createWine,
);

/**
 * @swagger
 * /wines/{id}:
 *   get:
 *     tags: [Wines]
 *     summary: Get a single wine by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the wine to retrieve
 *     responses:
 *       200:
 *         description: Wine data.
 *       404:
 *         description: Wine not found
 *       500:
 *         description: Server error
 */
router.get('/:id', isValidId(), wineController.getWineById);

/**
 * @swagger
 * /wines/{id}:
 *   patch:
 *     tags: [Wines]
 *     summary: Update an existing wine by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the wine to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Wine Name
 *               year:
 *                 type: integer
 *                 example: 2024
 *             responses:
 *       200:
 *         description: Wine updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Wine not found
 *       500:
 *         description: Server error
 */
router.patch(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  validateBody(updateWineSchema),
  wineController.updateWine,
);

/**
 * @swagger
 * /wines/{id}:
 *   delete:
 *     tags: [Wines]
 *     summary: Delete a wine by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the wine to delete
 *     responses:
 *       204:
 *         description: Wine deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Wine not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  wineController.deleteWine,
);

router.use('/:id/reviews', reviewRoutes);

export default router;
