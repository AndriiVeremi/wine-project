import { Router } from 'express';
import * as tourController from '@/controllers/tourController';
import { isValidId } from '@/middleware/isValidId';
import validateBody from '@/middleware/validateBody';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import { createTourSchema } from '@/schemas/tourSchemas';

const router = Router();

router.get('/', tourController.getAllTours);
router.get('/:id', isValidId(), tourController.getTourById);
router.post(
  '/',
  authMiddleware,
  validateBody(createTourSchema),
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  tourController.createTour,
);

export default router;
