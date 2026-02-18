import { Router } from 'express';
import GrapeController from '../controllers/grapeController';

const router = Router();

/**
 * @swagger
 * /grapes:
 *   get:
 *     tags: [Grapes]
 *     summary: Retrieve a list of all grape varieties
 *     responses:
 *       200:
 *         description: A list of grape varieties.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 60d21b4667d0d8992e610c85
 *                   name:
 *                     type: string
 *                     example: Cabernet Sauvignon
 *       500:
 *         description: Server error
 */
router.get('/', GrapeController.getGrapes);

export default router;
