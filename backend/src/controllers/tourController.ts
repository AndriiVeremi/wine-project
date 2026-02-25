import { Request, Response, NextFunction } from 'express';

import HttpError from '@/utils/HttpError';
import * as tourService from '@/services/tourService';
import { AuthenticatedRequest } from '@/middleware/auth';

export const getAllTours = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('get all');
    const result = await tourService.getAllTours(req.query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getTourById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await tourService.getTourById(id);
    if (!result) {
      throw new HttpError('Tour not found', 404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createTour = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const result = await tourService.createTour(req.body, req.userId!);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
