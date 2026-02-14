import { Router } from 'express';
import * as wineController from '@/controllers/wineController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { createWineSchema, updateWineSchema } from '@/schemas/wineSchemas';

const router = Router();

router.get(
  '/',
  wineController.getAllWines
);

router.post(
  '/',
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  validateBody(createWineSchema),
  wineController.createWine
);

router.get(
  '/:id',
  wineController.getWineById
);

router.patch(
  '/:id',
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  validateBody(updateWineSchema),
  wineController.updateWine
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  wineController.deleteWine
);

export default router;
