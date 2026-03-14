import { Router } from 'express';
import GrapeController from '@/controllers/grapeController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { createGrapeSchema, updateGrapeSchema } from '@/schemas/grapeSchemas';
import { isValidId } from '@/middleware/isValidId';
import upload from '@/middleware/uploadMiddleware';

const router = Router();

router.get('/', GrapeController.getGrapes);

router.post(
  '/',
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  validateBody(createGrapeSchema),
  GrapeController.addGrape,
);

router.patch(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  validateBody(updateGrapeSchema),
  GrapeController.updateGrape,
);

router.delete(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  GrapeController.deleteGrape,
);

router.patch(
  '/:id/images',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  upload.array('images', 5),
  GrapeController.updateGrapeImages,
);

export default router;
