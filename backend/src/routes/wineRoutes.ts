import { Router } from 'express';
import * as wineController from '@/controllers/wineController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { createWineSchema, updateWineSchema } from '@/schemas/wineSchemas';
import { isValidId } from '@/middleware/isValidId';
import upload from '@/middleware/uploadMiddleware';
import reviewRoutes from '@/routes/reviewRoutes';

const router = Router();

/**
 * @swagger
 * /wines:
 *   get:
 *     tags: [Wines]
 *     summary: Retrieve a list of all wines
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
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price, rating, year]
 *         description: Sort field
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [red, white, rose, sparkling, dessert]
 *         description: Wine type filter
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filter by country
 *       - in: query
 *         name: grape
 *         schema:
 *           type: string
 *         description: Filter by grape variety
 *     responses:
 *       200:
 *         description: A list of wines with pagination metadata.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 docs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b4667d0d8992e610c85
 *                       name:
 *                         type: string
 *                         example: Cabernet Sauvignon
 *                       winery:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       year:
 *                         type: integer
 *                         example: 2020
 *                       type:
 *                         type: string
 *                         example: red
 *                       price:
 *                         type: number
 *                         example: 25.99
 *                       rating:
 *                         type: number
 *                         example: 4.5
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 pages:
 *                   type: integer
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
 *                 example: Reserve Cabernet Sauvignon
 *               winery:
 *                 type: string
 *                 description: ID of the winery
 *                 example: 60d21b4667d0d8992e610c85
 *               year:
 *                 type: integer
 *                 example: 2019
 *               type:
 *                 type: string
 *                 enum: [red, white, rose, sparkling, dessert]
 *                 example: red
 *               description:
 *                 type: string
 *                 example: A rich and full-bodied red wine
 *               price:
 *                 type: number
 *                 example: 45.00
 *               alcohol:
 *                 type: number
 *                 example: 14.5
 *               volume:
 *                 type: number
 *                 example: 750
 *               grapes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60d21b4667d0d8992e610c86"]
 *               country:
 *                 type: string
 *                 description: ID of the country (Location)
 *                 example: 60d21b4667d0d8992e610c80
 *               region:
 *                 type: string
 *                 description: ID of the region (Location)
 *                 example: 60d21b4667d0d8992e610c81
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/wine.jpg
 *             required:
 *               - name
 *               - winery
 *               - type
 *     responses:
 *       201:
 *         description: Wine created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60d21b4667d0d8992e610c87
 *                 name:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (User is not WINERY_OWNER or ADMIN)
 *       404:
 *         description: Winery not found
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
 * /wines/{wineId}:
 *   get:
 *     tags: [Wines]
 *     summary: Get a single wine by ID
 *     parameters:
 *       - in: path
 *         name: wineId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the wine to retrieve
 *     responses:
 *       200:
 *         description: Wine data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60d21b4667d0d8992e610c87
 *                 name:
 *                   type: string
 *                   example: Reserve Cabernet Sauvignon
 *                 winery:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                 year:
 *                   type: integer
 *                   example: 2019
 *                 type:
 *                   type: string
 *                   example: red
 *                 price:
 *                   type: number
 *                   example: 45.00
 *                 rating:
 *                   type: number
 *                   example: 4.5
 *       404:
 *         description: Wine not found
 *       500:
 *         description: Server error
 */
router.get('/:id', isValidId(), wineController.getWineById);

/**
 * @swagger
 * /wines/{wineId}:
 *   patch:
 *     tags: [Wines]
 *     summary: Update an existing wine by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: wineId
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
 *                 example: Reserve Cabernet Sauvignon
 *               year:
 *                 type: integer
 *                 example: 2020
 *               type:
 *                 type: string
 *                 enum: [red, white, rose, sparkling, dessert]
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               alcohol:
 *                 type: number
 *               volume:
 *                 type: number
 *               grapes:
 *                 type: array
 *                 items:
 *                   type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Wine updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (User is not WINERY_OWNER or ADMIN)
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
 * /wines/{wineId}/image:
 *   patch:
 *     tags: [Wines]
 *     summary: Update wine image
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: wineId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the wine to update image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (jpeg, png, gif, webp, max 5MB)
 *     responses:
 *       200:
 *         description: Wine image updated successfully
 *       400:
 *         description: Invalid file format or size
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (User is not WINERY_OWNER or ADMIN)
 *       404:
 *         description: Wine not found
 *       500:
 *         description: Server error
 */
router.patch(
  '/:id/image',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  upload.single('image'),
  wineController.updateWineImage,
);

/**
 * @swagger
 * /wines/{wineId}:
 *   delete:
 *     tags: [Wines]
 *     summary: Delete a wine by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: wineId
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
 *         description: Forbidden (User is not WINERY_OWNER or ADMIN)
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
