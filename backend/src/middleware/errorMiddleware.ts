import { Request, Response, NextFunction } from 'express';
import HttpError from '@/utils/HttpError';

const errorMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorMiddleware;
