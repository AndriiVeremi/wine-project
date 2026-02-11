import { Router } from 'express';
import * as userController from '@/controllers/userController';
import { authMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { registerSchema, loginSchema } from '@/schemas/userSchemas';

const router = Router();

router.post(
  '/register',
  validateBody(registerSchema),
  userController.registerUser
);

router.post(
  '/login',
  validateBody(loginSchema),
);

router.get('/me', authMiddleware, userController.getUserProfile);

export default router;
