import { Router } from 'express';
import * as wineryController from '@/controllers/wineryController';
import { authMiddleware } from '@/middleware/auth'; 
import validateBody from '@/middleware/validateBody';
import { registerWinerySchema, updateWinerySchema } from '@/schemas/winerySchemas';

const router = Router();

router.post(
  '/',
  authMiddleware,
  validateBody(registerWinerySchema),
  wineryController.registerWinery
);

router.get(
  '/',
  wineryController.getWineries
);

router.get(
  '/:id',
  wineryController.getWinery
);

router.patch(
  '/:id',
  authMiddleware,
  validateBody(updateWinerySchema),
  wineryController.updateWinery
);

export default router;