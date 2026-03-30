import { Router } from 'express';
import GrapeController from '@/controllers/grapeController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { createGrapeSchema, updateGrapeSchema } from '@/schemas/grapeSchemas';
import { isValidId } from '@/middleware/isValidId';
import upload from '@/middleware/uploadMiddleware';
import parseFormData from '@/middleware/parseFormData';

const router = Router();

/**
 * @swagger
 * /grapes:
 *   get:
 *     tags: [Grapes]
 *     summary: Get all grapes
 */
router.get('/', GrapeController.getGrapes);
router.get('/:id', isValidId(), GrapeController.getGrapeById);

/**
 * @swagger
 * /grapes:
 *   post:
 *     tags: [Grapes]
 *     summary: Add new grape variety
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  upload.array('images', 5),
  parseFormData,
  validateBody(createGrapeSchema),
  GrapeController.addGrape,
);

/**
 * @swagger
 * /grapes/{id}:
 *   patch:
 *     tags: [Grapes]
 *     summary: Update grape variety
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
  validateBody(updateGrapeSchema),
  GrapeController.updateGrape,
);

/**
 * @swagger
 * /grapes/{id}:
 *   delete:
 *     tags: [Grapes]
 *     summary: Delete grape variety
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  GrapeController.deleteGrape,
);

/**
 * @swagger
 * /grapes/{id}/images:
 *   patch:
 *     tags: [Grapes]
 *     summary: Update grape images
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  '/:id/images',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  upload.array('images', 5),
  GrapeController.updateGrapeImages,
);

export default router;
