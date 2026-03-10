import { Router } from 'express';
import GrapeController from '@/controllers/grapeController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { createGrapeSchema } from '@/schemas/grapeSchemas';
import upload from '@/middleware/uploadMiddleware';

const router = Router();

router.get('/', GrapeController.getGrapes);

router.post(
  '/',
  authMiddleware,
  roleMiddleware(['ADMIN', 'WINERY_OWNER']),
  validateBody(createGrapeSchema),
  GrapeController.addGrape,
);

router.patch(
  '/:id/images',
  authMiddleware,
  roleMiddleware(['ADMIN', 'WINERY_OWNER']),
  upload.array('images', 5), // Limit to 5 images
  GrapeController.updateGrapeImages,
);

export default router;
