import { Router } from 'express';
import * as userController from '@/controllers/userController';
import { authMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { registerSchema, loginSchema, addFavoriteSchema } from '@/schemas/userSchemas';

const router = Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [Users]
 *     summary: Реєстрація нового користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "yourSecurePassword"
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid input or user already exists
 *       500:
 *         description: Server error
 */
router.post('/register', validateBody(registerSchema), userController.registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Вхід користувача в систему
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "yourSecurePassword"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', validateBody(loginSchema));

/**
 * @swagger
 * /users/me:
 *   get:
 *     tags: [Users]
 *     summary: Отримати профіль поточного користувача
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
 *     summary: Отримати список улюблених вин
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
 *     summary: Додати вино до улюблених
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
 *                 type: string
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
 *     summary: Видалити вино з улюблених
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
router.delete('/me/favorites/:wineId', authMiddleware, userController.removeFavoriteWine);

export default router;
