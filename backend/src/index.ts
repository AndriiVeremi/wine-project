import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from '@/middleware/errorMiddleware';
import { swaggerSpec } from '@/config/swagger';
dotenv.config();
import apiRouter from '@/routes/api';

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

const allowedOrigins = [
  process.env.CORS_ORIGIN,
  'https://wine-project-three.vercel.app',
  /\.vercel\.app$/,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.some((allowed) => {
        if (allowed instanceof RegExp) return allowed.test(origin);
        return allowed === origin;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: { message: 'Too many requests from this IP, please try again later.' },
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api', limiter);
app.use('/api', apiRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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
      console.log(`Backend server is running at port:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB or start server', error);
    process.exit(1);
  }
};

startServer();
