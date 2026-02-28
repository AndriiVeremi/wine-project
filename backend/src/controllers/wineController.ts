import { Request, Response } from 'express';
import { WineService } from '@/services/wineService';
import HttpError from '@/utils/HttpError';
import { AuthenticatedRequest } from '@/middleware/auth';
import ctrlWrapper from '@/utils/ctrlWrapper';

const wineService = new WineService();

export const getAllWines = ctrlWrapper(async (req: Request, res: Response) => {
  const { wines, totalCount, page, limit, totalPages } = await wineService.getAllWines(req.query);
  res.status(200).json({ wines, totalCount, page, limit, totalPages });
});

export const getWineById = ctrlWrapper(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const wine = await wineService.getWineById(id);
  res.status(200).json(wine);
});

export const createWine = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const newWine = await wineService.createWine(req.body, req.userId!);
  res.status(201).json(newWine);
});

export const updateWine = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id as string;
  const updatedWine = await wineService.updateWine(id, req.body, req.userId!, req.userRole!);
  if (!updatedWine) {
    throw new HttpError('Wine not found', 404);
  }
  res.status(200).json(updatedWine);
});

export const deleteWine = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id as string;
  await wineService.deleteWine(id, req.userId!, req.userRole!);
  res.status(200).json({ message: 'Wine delete' });
});
