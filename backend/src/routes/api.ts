import { Router } from 'express';
import userRoutes from '@/routes/userRoutes';
import wineryRoutes from '@/routes/wineryRoutes';
import wineRoutes from '@/routes/wineRoutes';
import locationRoutes from '@/routes/locationRoutes';
import grapeRoutes from '@/routes/grapeRoutes';
import aiRoutes from '@/routes/aiRoutes';
import tourRoutes from '@/routes/tourRoutes';
import regionRouter from '@/routes/regionRouter';
import devRoutes from '@/routes/devRoutes';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Wine Discovery Platform API!' });
});

router.use('/users', userRoutes);
router.use('/wineries', wineryRoutes);
router.use('/wines', wineRoutes);
router.use('/locations', locationRoutes);
router.use('/regions', regionRouter);
router.use('/grapes', grapeRoutes);
router.use('/ai', aiRoutes);
router.use('/tours', tourRoutes);
router.use('/dev', devRoutes);

export default router;
