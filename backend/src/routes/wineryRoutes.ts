import { Router } from 'express';
import * as wineryController from '@/controllers/wineryController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { registerWinerySchema, updateWinerySchema } from '@/schemas/winerySchemas';
import { isValidId } from '@/middleware/isValidId';
import upload from '@/middleware/uploadMiddleware';
import reviewRoutes from '@/routes/reviewRoutes';

const router = Router();

/**
 * @swagger
 * /wineries:
 *   get:
 *     tags: [Wineries]
 *     summary: Get all wineries
 */
router.get('/', wineryController.getWineries);

/**
 * @swagger
 * /wineries:
 *   post:
 *     tags: [Wineries]
 *     summary: Register winery
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/',
  authMiddleware,
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]),
  validateBody(registerWinerySchema),
  wineryController.registerWinery,
);

/**
 * @swagger
 * /wineries/{id}:
 *   get:
 *     tags: [Wineries]
 *     summary: Get winery by ID
 */
router.get('/:id', isValidId(), wineryController.getWinery);

/**
 * @swagger
 * /wineries/{id}:
 *   patch:
 *     tags: [Wineries]
 *     summary: Update winery
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]),
  validateBody(updateWinerySchema),
  wineryController.updateWinery,
);

/**
 * @swagger
 * /wineries/{id}:
 *   delete:
 *     tags: [Wineries]
 *     summary: Delete winery
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  wineryController.deleteWinery,
);

/**
 * @swagger
 * /wineries/{id}/vip:
 *   patch:
 *     tags: [Admin]
 *     summary: Toggle VIP status (Admin only)
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  '/:id/vip',
  isValidId(),
  authMiddleware,
  roleMiddleware(['ADMIN']),
  wineryController.toggleVipStatus,
);

router.use('/:id/reviews', isValidId(), reviewRoutes);

export default router;
