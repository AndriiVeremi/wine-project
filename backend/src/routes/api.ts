import { Router } from 'express';
import userRoutes from '@/routes/userRoutes';
import wineryRoutes from '@/routes/wineryRoutes';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Wine Discovery Platform API!' });
});

router.use('/users', userRoutes);
router.use('/wineries', wineryRoutes);

export default router;
