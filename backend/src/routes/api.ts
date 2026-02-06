import { Router } from 'express';
import userRoutes from './userRoutes';
import wineryRoutes from './wineryRoutes';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Wine Discovery Platform API!' });
});

router.use('/users', userRoutes);
router.use('/wineries', wineryRoutes);

export default router;
