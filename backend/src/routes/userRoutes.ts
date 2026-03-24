import { Router } from 'express';
import * as userController from '@/controllers/userController';
import { getUserReviews } from '@/controllers/reviewController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { registerSchema, loginSchema, addFavoriteSchema, updateProfileSchema } from '@/schemas/userSchemas';
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
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               role: { type: string, enum: [USER, WINERY_OWNER] }
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/register', validateBody(registerSchema), userController.registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Login user (validation only, actual login on client)
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/login', validateBody(loginSchema), (req, res) => res.status(200).json({ message: 'Validation successful' }));

/**
 * @swagger
 * /users/me:
 *   get:
 *     tags: [Users]
 *     summary: Get current user profile
 *     security:
 *       - bearerAuth: []
 */
router.get('/me', authMiddleware, userController.getUserProfile);

/**
 * @swagger
 * /users/me:
 *   patch:
 *     tags: [Users]
 *     summary: Update profile
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  '/me',
  authMiddleware,
  validateBody(updateProfileSchema),
  userController.updateUserProfile,
);

router.get('/me/reviews', authMiddleware, getUserReviews);
router.get('/me/favorites', authMiddleware, userController.getUserFavorites);
router.post(
  '/me/favorites',
  authMiddleware,
  validateBody(addFavoriteSchema),
  userController.addFavoriteWine,
);
router.delete(
  '/me/favorites/:wineId',
  authMiddleware,
  isValidId('wineId'),
  userController.removeFavoriteWine,
);
router.patch('/me/avatar', authMiddleware, userController.updateAvatar);

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Admin]
 *     summary: Get all users (Admin only)
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authMiddleware, roleMiddleware(['ADMIN']), userController.getAllUsers);

/**
 * @swagger
 * /users/{id}/ban:
 *   patch:
 *     tags: [Admin]
 *     summary: Toggle user ban status (Admin only)
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  '/:id/ban',
  isValidId(),
  authMiddleware,
  roleMiddleware(['ADMIN']),
  userController.toggleUserBan,
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: Delete user (Admin only)
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['ADMIN']),
  userController.adminDeleteUser,
);

export default router;
