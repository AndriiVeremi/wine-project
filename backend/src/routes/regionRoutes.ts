import { Router } from 'express';
import validateParams from '@/middleware/validateParams';
import * as regionController from '@/controllers/regionController';
import { searchRegionSchema } from '@/schemas/regionSchemas';

const router = Router();

router.get('/:name', validateParams(searchRegionSchema), regionController.getRegionByName);

export default router;
