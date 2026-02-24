import { isValidObjectId } from 'mongoose';
import HttpError from '../utils/HttpError';
import { Request, Response, NextFunction } from 'express';

export const isValidId =
  (paramName: string = 'id') =>
  (req: Request, res: Response, next: NextFunction) => {
    const id = req.params[paramName];

    if (!id || !isValidObjectId(id)) {
      return next(new HttpError(`${paramName}: ${id} is not a valid MongoDB ID`, 400));
    }

    next();
  };
