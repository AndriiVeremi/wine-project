import { Router } from 'express';
import { importData, deleteData } from '@/data/seeder';

const router = Router();

router.post('/seed', async (_req, res) => {
  try {
    await importData();
    res.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Failed to seed database' });
  }
});

router.delete('/seed', async (_req, res) => {
  try {
    await deleteData();
    res.json({ message: 'Database cleared successfully' });
  } catch (error) {
    console.error('Destroy error:', error);
    res.status(500).json({ error: 'Failed to clear database' });
  }
});

export default router;
