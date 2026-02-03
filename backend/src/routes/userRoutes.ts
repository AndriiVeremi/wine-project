import { Router } from 'express';
import { registerUser, getUserProfile } from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';
import validateBody from '../middleware/validateBody';
import { registerSchema, loginSchema } from '../schemas/userSchemas'; // Import Joi schemas

const router = Router();

router.post(
  '/register',
  validateBody(registerSchema),
  registerUser
);

router.post(
  '/login',
  validateBody(loginSchema),
);

router.get('/me', authMiddleware, getUserProfile);

export default router;
