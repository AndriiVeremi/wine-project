import { Request, Response } from 'express';
import * as tourService from '@/services/tourService';
import { AuthenticatedRequest } from '@/middleware/auth';
import ctrlWrapper from '@/utils/ctrlWrapper';
import { uploadFile } from '@/services/firebase';

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
  const tourData = { ...req.body };
  const files = req.files as Express.Multer.File[];

  if (files && files.length > 0) {
    const uploadPromises = files.map((file) => uploadFile(file, 'tours'));
    tourData.images = await Promise.all(uploadPromises);
  }

  const result = await tourService.createTour(tourData, req.userId!);
  res.status(201).json(result);
});

export const updateTour = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const tourData = { ...req.body };
  const files = req.files as Express.Multer.File[];

  if (files && files.length > 0) {
    const uploadPromises = files.map((file) => uploadFile(file, 'tours'));
    const newImages = await Promise.all(uploadPromises);

    if (tourData.images && Array.isArray(tourData.images)) {
      tourData.images = [...tourData.images, ...newImages].slice(0, 5);
    } else {
      tourData.images = newImages;
    }
  }

  const result = await tourService.updateTour(id as string, tourData, req.userId!);
  res.status(200).json(result);
});

export const deleteTour = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id as string;
  await tourService.deleteTour(id, req.userId!);
  res.status(204).send();
});
