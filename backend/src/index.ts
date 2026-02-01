import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// === Налаштування Middleware ===
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// === Роути (маршрути) ===
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Wine Discovery Platform Backend!' });
});

// === Запуск сервера та підключення до БД ===
const startServer = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in .env file');
    }

    await mongoose.connect(mongoUri);
    console.log('Successfully connected to MongoDB!');

    app.listen(port, () => {
      console.log(`Backend server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB or start server', error);
    process.exit(1);
  }
};

startServer();
