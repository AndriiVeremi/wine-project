import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRouter from '@/routes/api';
import errorMiddleware from '@/middleware/errorMiddleware';

dotenv.config();

import '@/models/userModel';
import '@/models/wineryModel';
import '@/models/wineModel';
import '@/models/reviewModel';
import '@/models/grapeModel';
import '@/models/tourModel';
import '@/models/locationModel';
import '@/models/regionModel';

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api', apiRouter);

app.use(errorMiddleware);

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
