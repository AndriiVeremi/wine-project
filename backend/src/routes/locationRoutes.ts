import { Router } from 'express';
import LocationController from '@/controllers/locationController';

const router = Router();

router.get('/countries', LocationController.getCountries);
router.get('/regions', LocationController.getRegionsByCountry);

export default router;
