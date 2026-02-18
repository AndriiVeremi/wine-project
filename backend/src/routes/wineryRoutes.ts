import { Router } from 'express';
import * as wineryController from '@/controllers/wineryController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { registerWinerySchema, updateWinerySchema } from '@/schemas/winerySchemas';

const router = Router();

/**
 * @swagger
 * /wineries:
 *   post:
 *     tags: [Wineries]
 *     summary: Register a new winery
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
 *                 example: My Awesome Winery
 *               region:
 *                 type: string
 *                 example: Bordeaux
 *               description:
 *                 type: string
 *                 example: A brief description of the winery.
 *               address:
 *                 type: string
 *                 example: 123 Winery Road
 *               contactEmail:
 *                 type: string
 *                 format: email
 *                 example: info@mywinery.com
 *               contactPhone:
 *                 type: string
 *                 example: "+1234567890"
 *             required:
 *               - name
 *               - region
 *               - description
 *               - address
 *               - contactEmail
 *     responses:
 *       201:
 *         description: Winery registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60d21b4667d0d8992e610c85
 *                 name:
 *                   type: string
 *                   example: My Awesome Winery
 *                 region:
 *                   type: string
 *                   example: Bordeaux
 *                 # ... other winery properties
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
  '/',
  authMiddleware,
  validateBody(registerWinerySchema),
  wineryController.registerWinery,
);

/**
 * @swagger
 * /wineries:
 *   get:
 *     tags: [Wineries]
 *     summary: Get a list of all wineries
 *     responses:
 *       200:
 *         description: A list of wineries.
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
 *                     example: My Awesome Winery
 *                   region:
 *                     type: string
 *                     example: Bordeaux
 *                   # ... other winery properties
 *       500:
 *         description: Server error
 */
router.get('/', wineryController.getWineries);

/**
 * @swagger
 * /wineries/{id}:
 *   get:
 *     tags: [Wineries]
 *     summary: Get a single winery by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the winery to retrieve
 *     responses:
 *       200:
 *         description: Winery data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60d21b4667d0d8992e610c85
 *                 name:
 *                   type: string
 *                   example: My Awesome Winery
 *                 region:
 *                   type: string
 *                   example: Bordeaux
 *                   # ... other winery properties
 *       404:
 *         description: Winery not found
 *       500:
 *         description: Server error
 */
router.get('/:id', wineryController.getWinery);

/**
 * @swagger
 * /wineries/{id}:
 *   patch:
 *     tags: [Wineries]
 *     summary: Update an existing winery by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the winery to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: My Updated Winery Name
 *               description:
 *                 type: string
 *                 example: An updated description.
 *             # ... allow other fields to be updated
 *     responses:
 *       200:
 *         description: Winery updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60d21b4667d0d8992e610c85
 *                 name:
 *                   type: string
 *                   example: My Updated Winery Name
 *                   # ... other winery properties
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (e.g., user not owner or admin)
 *       404:
 *         description: Winery not found
 *       500:
 *         description: Server error
 */
router.patch(
  '/:id',
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  validateBody(updateWinerySchema),
  wineryController.updateWinery,
);

/**
 * @swagger
 * /wineries/{id}:
 *   delete:
 *     tags: [Wineries]
 *     summary: Delete a winery by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the winery to delete
 *     responses:
 *       204:
 *         description: Winery deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (user is not an admin or the owner)
 *       404:
 *         description: Winery not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  wineryController.deleteWinery,
);

export default router;
