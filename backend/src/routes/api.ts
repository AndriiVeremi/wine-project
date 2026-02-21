import { Router } from 'express';
import userRoutes from '@/routes/userRoutes';
import wineryRoutes from '@/routes/wineryRoutes';
import wineRoutes from '@/routes/wineRoutes';
import reviewRoutes from '@/routes/reviewRoutes';
import locationRoutes from '@/routes/locationRoutes';
import grapeRoutes from '@/routes/grapeRoutes';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Wine Discovery Platform API!' });
});

router.use('/users', userRoutes);
router.use('/wineries', wineryRoutes);
router.use('/wines', reviewRoutes);
router.use('/wines', wineRoutes);
router.use('/locations', locationRoutes);
router.use('/grapes', grapeRoutes);


export default router;
