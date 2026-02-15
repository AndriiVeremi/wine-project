import { Router } from 'express';
import * as userController from '@/controllers/userController';
import { authMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { registerSchema, loginSchema, addFavoriteSchema } from '@/schemas/userSchemas';

const router = Router();

router.post('/register', validateBody(registerSchema), userController.registerUser);

router.post('/login', validateBody(loginSchema));

router.get('/me', authMiddleware, userController.getUserProfile);

router.get('/me/favorites', authMiddleware, userController.getUserFavorites);

router.post(
  '/me/favorites',
  authMiddleware,
  validateBody(addFavoriteSchema),
  userController.addFavoriteWine,
);

router.delete('/me/favorites/:wineId', authMiddleware, userController.removeFavoriteWine);

export default router;
