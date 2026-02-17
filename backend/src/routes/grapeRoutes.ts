import { Router } from 'express';
import GrapeController from '../controllers/grapeController';

const router = Router();

router.get('/', GrapeController.getGrapes);

export default router;
