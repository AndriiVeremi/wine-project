import { Router } from 'express';
import * as wineryController from '@/controllers/wineryController';
import { authMiddleware, roleMiddleware } from '@/middleware/auth';
import validateBody from '@/middleware/validateBody';
import { registerWinerySchema, updateWinerySchema } from '@/schemas/winerySchemas';
import { isValidId } from '@/middleware/isValidId';
import upload from '@/middleware/uploadMiddleware';

const router = Router();

/**
 * @swagger
 * /wineries:
 *   post:
 *     tags: [Wineries]
 *     summary: Register a new winery
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: My Winery
 *               country:
 *                 type: string
 *               region:
 *                 type: string
 *               description:
 *                 type: string
 *               history:
 *                 type: string
 *               address:
 *                 type: string
 *               contactEmail:
 *                 type: string
 *               contactPhone:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *             required:
 *               - name
 *               - contactEmail
 *               - contactPhone
 *     responses:
 *       201:
 *         description: Winery registered successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
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
 * /wineries:
 *   get:
 *     tags: [Wineries]
 *     summary: Get a list of all wineries
 *     responses:
 *       200:
 *         description: A list of wineries.
 */
router.get('/', wineryController.getWineries);

/**
 * @swagger
 * /wineries/{wineryId}:
 *   get:
 *     tags: [Wineries]
 *     summary: Get a single winery by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Winery data.
 *       404:
 *         description: Winery not found
 */
router.get('/:id', isValidId(), wineryController.getWinery);

/**
 * @swagger
 * /wineries/{wineryId}:
 *   patch:
 *     tags: [Wineries]
 *     summary: Update an existing winery by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Winery updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Winery not found
 *       500:
 *         description: Server error
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
 * /wineries/{wineryId}:
 *   delete:
 *     tags: [Wineries]
 *     summary: Delete a winery by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the winery to delete
 *     responses:
 *       204:
 *         description: Winery deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (user is not an admin or the owner)
 *       404:
 *         description: Winery not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/:id',
  isValidId(),
  authMiddleware,
  roleMiddleware(['WINERY_OWNER', 'ADMIN']),
  wineryController.deleteWinery,
);

router.patch(
  '/:id/vip',
  isValidId(),
  authMiddleware,
  roleMiddleware(['ADMIN']),
  wineryController.toggleVipStatus,
);

export default router;
