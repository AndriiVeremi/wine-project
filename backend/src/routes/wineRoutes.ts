import { Router } from 'express';
import * as wineController from '@/controllers/wineController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import parseFormData from '@/middleware/parseFormData';
import { createWineSchema, updateWineSchema } from '@/schemas/wineSchemas';
import { isValidId } from '@/middleware/isValidId';
import upload from '@/middleware/uploadMiddleware';
import reviewRoutes from '@/routes/reviewRoutes';

const router = Router();

/**
 * @swagger
 * /wines:
 *   get:
 *     tags: [Wines]
 *     summary: Retrieve a list of all wines
 */
router.get('/', wineController.getAllWines);

/**
 * @swagger
 * /wines:
 *   post:
 *     tags: [Wines]
 *     summary: Create a new wine
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  upload.fields([{ name: 'image', maxCount: 1 }]),
  parseFormData,
  validateBody(createWineSchema),
  wineController.createWine,
);

/**
 * @swagger
 * /wines/{wineId}:
 *   get:
 *     tags: [Wines]
 *     summary: Get a single wine by ID
 */
router.get('/:id', isValidId(), wineController.getWineById);

/**
 * @swagger
 * /wines/{wineId}:
 *   patch:
 *     tags: [Wines]
 *     summary: Update an existing wine by ID
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  upload.fields([{ name: 'image', maxCount: 1 }]),
  parseFormData,
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

/**
 * @swagger
 * /wines/{wineId}:
 *   delete:
 *     tags: [Wines]
 *     summary: Delete a wine by ID
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  wineController.deleteWine,
);

router.use('/:id/reviews', reviewRoutes);

export default router;
