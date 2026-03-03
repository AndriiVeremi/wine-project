import { Router } from 'express';
import * as userController from '@/controllers/userController';
import { authMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { registerSchema, addFavoriteSchema } from '@/schemas/userSchemas';
import { isValidId } from '@/middleware/isValidId';

const router = Router();

router.post('/register', validateBody(registerSchema), userController.registerUser);

/**
 * @swagger
 * /users/me:
 *   get:
 *     tags: [Users]
 *     summary: User profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/me', authMiddleware, userController.getUserProfile);

/**
 * @swagger
 * /users/me/favorites:
 *   get:
 *     tags: [Users]
 *     summary: List of favorite wines
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of favorite wines.
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/me/favorites', authMiddleware, userController.getUserFavorites);

/**
 * @swagger
 * /users/me/favorites:
 *   post:
 *     tags: [Users]
 *     summary: Add wines to favorites
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               wineId:
 *                 type: 699dd41edd32bbaa0b2e3062
 *                 description: The ID of the wine to add to favorites
 *             required:
 *               - wineId
 *     responses:
 *       200:
 *         description: Wine added to favorites successfully.
 *       400:
 *         description: Wine is already in favorites
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Wine not found
 *       500:
 *         description: Server error
 */
router.post(
  '/me/favorites',
  authMiddleware,
  validateBody(addFavoriteSchema),
  userController.addFavoriteWine,
);

/**
 * @swagger
 * /users/me/favorites/{wineId}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete wines from favorites
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: wineId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the wine to remove from favorites
 *     responses:
 *       200:
 *         description: Wine removed from favorites successfully.
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Wine not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/me/favorites/:wineId',
  authMiddleware,
  isValidId('wineId'),
  userController.removeFavoriteWine,
);

/**
 * @swagger
 * /users/me/avatar:
 *   patch:
 *     tags: [Users]
 *     summary: Update user avatar
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Image file (jpeg, png, gif, webp, max 5MB)
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *       400:
 *         description: Invalid file format or size
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.patch('/me/avatar', authMiddleware, userController.updateAvatar);

export default router;
