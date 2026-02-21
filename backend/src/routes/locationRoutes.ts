import { Router } from 'express';
import LocationController from '@/controllers/locationController';

const router = Router();

/**
 * @swagger
 * /locations/countries:
 *   get:
 *     tags: [Locations]
 *     summary: Retrieve a list of unique countries
 *     responses:
 *       200:
 *         description: A list of countries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: Georgia
 *       500:
 *         description: Server error
 */
router.get('/countries', LocationController.getCountries);

/**
 * @swagger
 * /locations/regions:
 *   get:
 *     tags: [Locations]
 *     summary: Retrieve a list of regions for a given country
 *     parameters:
 *       - in: query
 *         name: country
 *         required: true
 *         schema:
 *           type: string
 *         description: The country to get regions for
 *         example: Georgia
 *     responses:
 *       200:
 *         description: A list of regions for the specified country.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: Bordeaux
 *       400:
 *         description: Country query parameter is required
 *       500:
 *         description: Server error
 */
router.get('/regions', LocationController.getRegionsByCountry);

export default router;
