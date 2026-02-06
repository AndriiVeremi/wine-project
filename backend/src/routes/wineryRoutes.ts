import { Router } from 'express';
import { registerWinery, getWineries, getWinery, updateWinery } from '../controllers/wineryController';
import { authMiddleware } from '../middleware/auth'; // Припускаємо, що authMiddleware встановлює req.userId
import validateBody from '../middleware/validateBody';
import { registerWinerySchema, updateWinerySchema } from '../schemas/winerySchemas';

const router = Router();

router.post('/register-winery', authMiddleware, validateBody(registerWinerySchema), registerWinery);
router.get('/', getWineries);
router.get('/:id', getWinery);
router.patch('/:id', authMiddleware, validateBody(updateWinerySchema), updateWinery);

export default router;