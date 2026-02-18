import { Router } from 'express';
import * as wineController from '@/controllers/wineController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { createWineSchema, updateWineSchema } from '@/schemas/wineSchemas';

const router = Router();

/**
 * @swagger
 * /wines:
 *   get:
 *     tags: [Wines]
 *     summary: Retrieve a list of wines with optional filters
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [Red, White, Rose, Sparkling, Dessert]
 *         description: Filter by wine type
 *       - in: query
 *         name: grape
 *         schema:
 *           type: string
 *         description: Filter by grape variety
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
 *     responses:
 *       200:
 *         description: A list of wines.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 60d21b4667d0d8992e610c85
 *                   name:
 *                     type: string
 *                     example: Château Margaux
 *                   year:
 *                     type: integer
 *                     example: 2015
 *                   # ... other wine properties
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
 *               year:
 *                 type: integer
 *                 example: 2023
 *               grape:
 *                 type: string
 *                 description: ID of the grape variety
 *                 example: 60d21b4667d0d8992e610c86
 *               type:
 *                 type: string
 *                 enum: [Red, White, Rose, Sparkling, Dessert]
 *                 example: Red
 *             required:
 *               - name
 *               - winery
 *               - year
 *               - grape
 *               - type
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
router.get('/:id', wineController.getWineById);

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
 *     responses:
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
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  wineController.deleteWine,
);

export default router;
