import { Request, Response } from 'express';
import * as tourService from '@/services/tourService';
import { AuthenticatedRequest } from '@/middleware/auth';
import ctrlWrapper from '@/utils/ctrlWrapper';

export const getAllTours = ctrlWrapper(async (req: Request, res: Response) => {
  const result = await tourService.getAllTours(req.query as { page?: string; limit?: string });
  res.status(200).json(result);
});

export const getTourById = ctrlWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await tourService.getTourById(id as string);
  res.status(200).json(result);
});

export const getToursByWinery = ctrlWrapper(async (req: Request, res: Response) => {
  const { wineryId } = req.params;
  const result = await tourService.getToursByWinery(wineryId as string);
  res.status(200).json(result);
});

export const createTour = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const result = await tourService.createTour(req.body, req.userId!);
  res.status(201).json(result);
});

export const updateTour = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const result = await tourService.updateTour(id as string, req.body, req.userId!);
  res.status(200).json(result);
});

export const deleteTour = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id as string;
  await tourService.deleteTour(id, req.userId!);
  res.status(204).send();
});
