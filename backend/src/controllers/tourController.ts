import { Request, Response } from 'express';
import * as tourService from '@/services/tourService';
import { AuthenticatedRequest } from '@/middleware/auth';
import ctrlWrapper from '@/utils/ctrlWrapper';
import HttpError from '@/utils/HttpError';
import { uploadFile, deleteFile } from '@/services/firebase';

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

  const tour = await tourService.getTourById(id as string);
  if (!tour) throw new HttpError('Tour not found.', 404);

  let imagesToKeep: string[] = [];
  if (tourData.images) {
    imagesToKeep = Array.isArray(tourData.images) ? tourData.images : [tourData.images];
  }

  const currentImages = tour.images || [];

  const removedImages = currentImages.filter((url) => !imagesToKeep.includes(url));
  if (removedImages.length > 0) {
    await Promise.all(removedImages.map((url) => deleteFile(url)));
  }

  let updatedImages = [...imagesToKeep];
  if (files && files.length > 0) {
    const isMainPhotoReplaced =
      imagesToKeep.length === 0 || !imagesToKeep.includes(currentImages[0]);
    const newUrls = await Promise.all(files.map((file) => uploadFile(file, 'tours')));

    if (isMainPhotoReplaced && newUrls.length > 0) {
      updatedImages = [newUrls[0], ...imagesToKeep, ...newUrls.slice(1)];
    } else {
      updatedImages = [...imagesToKeep, ...newUrls];
    }
  }

  const finalImages = updatedImages.slice(0, 5);
  if (updatedImages.length > 5) {
    const dropped = updatedImages.slice(5);
    await Promise.all(dropped.map((url) => deleteFile(url)));
  }

  tourData.images = finalImages;

  const result = await tourService.updateTour(id as string, tourData, req.userId!);
  res.status(200).json(result);
});

export const deleteTour = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id as string;
  await tourService.deleteTour(id, req.userId!);
  res.status(204).send();
});
