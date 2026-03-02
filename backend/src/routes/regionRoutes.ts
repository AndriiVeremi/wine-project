import { Router } from 'express';
import * as regionController from '@/controllers/regionController';

const router = Router();

/**
 * @swagger
 * /regions:
 *   get:
 *     tags: [Locations]
 *     summary: Retrieve a list of all regions or filter regions by country
 *     parameters:
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Name of the country to filter regions (e.g., France, Italy)
 *     responses:
 *       200:
 *         description: A list of regions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   country:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *       404:
 *         description: Country not found
 *       500:
 *         description: Server error
 */
router.get('/', regionController.getRegionsByCountry);

/**
 * @swagger
 * /regions/{region}:
 *   get:
 *     tags: [Locations]
 *     summary: Get detailed information about a specific region by its name
 *     parameters:
 *       - in: path
 *         name: region
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the region to retrieve (e.g., Bordeaux, Tuscany)
 *     responses:
 *       200:
 *         description: Detailed information about the region.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                   example: Bordeaux
 *                 description:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                 country:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                       example: France
 *                 climate:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     features:
 *                       type: array
 *                       items:
 *                         type: string
 *                 soils:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     mainTypes:
 *                       type: array
 *                       items:
 *                         type: string
 *                     properties:
 *                       type: array
 *                       items:
 *                         type: string
 *                 traditions:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     rituals:
 *                       type: array
 *                       items:
 *                         type: string
 *                 grapeVarieties:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     white:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *                     red:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *                 typicalWines:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     styles:
 *                       type: array
 *                       items:
 *                         type: string
 *                 pdos:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     list:
 *                       type: array
 *                       items:
 *                         type: string
 *                 importance:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     points:
 *                       type: array
 *                       items:
 *                         type: string
 *       404:
 *         description: Region not found
 *       500:
 *         description: Server error
 */
router.get('/:region', regionController.getRegionByName);

export default router;
