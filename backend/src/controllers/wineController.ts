import { Request, Response, NextFunction } from 'express';
import { WineService } from '@/services/wineService';
import HttpError from '@/utils/HttpError';
import { AuthenticatedRequest } from '@/middleware/auth';

const wineService = new WineService();

export const getAllWines = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wines = await wineService.getAllWines(req.query);
    res.status(200).json(wines);
  } catch (error) {
    next(error);
  }
};

export const getWineById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const wine = await wineService.getWineById(id);
    if (!wine) {
      throw new HttpError('Wine not found', 404);
    }
    res.status(200).json(wine);
  } catch (error) {
    next(error);
  }
};

export const createWine = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      throw new HttpError('User not authenticated', 401);
    }
    const newWine = await wineService.createWine(req.body, req.userId);
    res.status(201).json(newWine);
  } catch (error) {
    next(error);
  }
};

export const updateWine = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    if (!req.userId || !req.userRole) {
      throw new HttpError('User not authenticated or role missing', 401);
    }
    const updatedWine = await wineService.updateWine(id, req.body, req.userId, req.userRole);
    if (!updatedWine) {
      throw new HttpError('Wine not found', 404);
    }
    res.status(200).json(updatedWine);
  } catch (error) {
    next(error);
  }
};

export const deleteWine = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    if (!req.userId || !req.userRole) {
      throw new HttpError('User not authenticated or role missing', 401);
    }
    await wineService.deleteWine(id, req.userId, req.userRole);
    res.status(200).json({ message: 'Вино успішно видалено' });
  } catch (error) {
    next(error);
  }
};
