import { Router } from 'express';
import * as userController from '@/controllers/userController';
import { getUserReviews } from '@/controllers/reviewController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { registerSchema, addFavoriteSchema, updateProfileSchema } from '@/schemas/userSchemas';
import { isValidId } from '@/middleware/isValidId';

const router = Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [Users]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [USER, WINERY_OWNER]
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 */
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
 * /users/me:
 *   patch:
 *     tags: [Users]
 *     summary: Update user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.patch(
  '/me',
  authMiddleware,
  validateBody(updateProfileSchema),
  userController.updateUserProfile,
);

/**
 * @swagger
 * /users/me/reviews:
 *   get:
 *     tags: [Users]
 *     summary: Get all reviews written by the current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user reviews.
 */
router.get('/me/reviews', authMiddleware, getUserReviews);

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

// Admin routes
router.get('/', authMiddleware, roleMiddleware(['ADMIN']), userController.getAllUsers);
router.patch(
  '/:id/ban',
  isValidId(),
  authMiddleware,
  roleMiddleware(['ADMIN']),
  userController.toggleUserBan,
);
router.delete(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['ADMIN']),
  userController.adminDeleteUser,
);

export default router;
