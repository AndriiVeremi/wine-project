import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import apiRouter from '@/routes/api';
import errorMiddleware from '@/middleware/errorMiddleware';
import { swaggerSpec } from '@/config/swagger';

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
const port = process.env.PORT;

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: { message: 'Too many requests from this IP, please try again later.' },
});
app.use(limiter);

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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
