import { Router } from 'express';
import * as tourController from '@/controllers/tourController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import { isValidId } from '@/middleware/isValidId';
import parseFormData from '@/middleware/parseFormData';
import upload from '@/middleware/uploadMiddleware';
import reviewRoutes from '@/routes/reviewRoutes';

const router = Router();

/**
 * @swagger
 * /tours:
 *   get:
 *     tags: [Tours]
 *     summary: Get all tours
 */
router.get('/', tourController.getAllTours);

/**
 * @swagger
 * /tours:
 *   post:
 *     tags: [Tours]
 *     summary: Create new tour
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  upload.array('images', 5),
  parseFormData,
  tourController.createTour,
);

/**
 * @swagger
 * /tours/{id}:
 *   get:
 *     tags: [Tours]
 *     summary: Get tour by ID
 */
router.get('/:id', isValidId(), tourController.getTourById);

/**
 * @swagger
 * /tours/{id}:
 *   patch:
 *     tags: [Tours]
 *     summary: Update tour
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  upload.array('images', 5),
  parseFormData,
  tourController.updateTour,
);

/**
 * @swagger
 * /tours/{id}:
 *   delete:
 *     tags: [Tours]
 *     summary: Delete tour
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  tourController.deleteTour,
);

router.use('/:id/reviews', reviewRoutes);

export default router;
