import { Router } from 'express';
import GrapeController from '@/controllers/grapeController';

const router = Router();

/**
 * @swagger
 * /grapes:
 *   get:
 *     tags: [Grapes]
 *     summary: Retrieve a list of all grape varieties
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by grape name
 *         example: Cabernet
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
 *                   type:
 *                     type: string
 *                     enum: [red, white, rose]
 *                     example: red
 *                   description:
 *                     type: string
 *                     example: A full-bodied red grape variety
 *                   alsoKnownAs:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Cabernet", "CS"]
 *                   characteristics:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["full-bodied", "high tannins", "blackcurrant"]
 *                   foodPairing:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["red meat", "aged cheese", "dark chocolate"]
 *                   imageUrl:
 *                     type: string
 *                     example: https://example.com/grapes/cabernet.jpg
 *       500:
 *         description: Server error
 */
router.get('/', GrapeController.getGrapes);

export default router;
