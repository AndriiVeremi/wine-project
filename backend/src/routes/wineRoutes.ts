import { Router } from 'express';
import * as wineController from '@/controllers/wineController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { createWineSchema, updateWineSchema } from '@/schemas/wineSchemas';
import { isValidId } from '@/middleware/isValidId';
import upload from '@/middleware/uploadMiddleware';
import reviewRoutes from '@/routes/reviewRoutes';

const router = Router();

router.get('/', wineController.getAllWines);

router.post(
  '/',
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  validateBody(createWineSchema),
  wineController.createWine,
);

router.get('/:id', isValidId(), wineController.getWineById);

router.patch(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  validateBody(updateWineSchema),
  wineController.updateWine,
);

router.patch(
  '/:id/image',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  upload.single('image'),
  wineController.updateWineImage,
);

router.delete(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  wineController.deleteWine,
);

router.use('/:id/reviews', reviewRoutes);

export default router;
