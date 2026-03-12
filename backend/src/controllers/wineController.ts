import { Request, Response } from 'express';
import { WineService } from '@/services/wineService';
import HttpError from '@/utils/HttpError';
import { AuthenticatedRequest } from '@/middleware/auth';
import ctrlWrapper from '@/utils/ctrlWrapper';
import { uploadFile } from '@/services/firebase';

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
  const wineData = { ...req.body };
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (typeof wineData.tastingNotes === 'string') {
    wineData.tastingNotes = JSON.parse(wineData.tastingNotes);
  }
  if (typeof wineData.foodPairing === 'string') {
    wineData.foodPairing = JSON.parse(wineData.foodPairing);
  }

  if (files?.image && files.image[0]) {
    wineData.imageUrl = await uploadFile(files.image[0], 'wines/main');
  }

  const newWine = await wineService.createWine(wineData, req.userId!);
  res.status(201).json(newWine);
});

export const updateWine = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id as string;
  const wineData = { ...req.body };
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (typeof wineData.tastingNotes === 'string') {
    wineData.tastingNotes = JSON.parse(wineData.tastingNotes);
  }
  if (typeof wineData.foodPairing === 'string') {
    wineData.foodPairing = JSON.parse(wineData.foodPairing);
  }

  if (files?.image && files.image[0]) {
    wineData.imageUrl = await uploadFile(files.image[0], 'wines/main');
  }

  const updatedWine = await wineService.updateWine(id, wineData, req.userId!, req.userRole!);
  if (!updatedWine) {
    throw new HttpError('Wine not found', 404);
  }
  res.status(200).json(updatedWine);
});

export const updateWineImage = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id as string;
  const file = req.file;

  if (!file) {
    throw new HttpError('Image file is required', 400);
  }

  const updatedWine = await wineService.updateWineImage(id, file, req.userId!, req.userRole!);

  if (!updatedWine) {
    throw new HttpError('Wine not found', 404);
  }

  res.status(200).json(updatedWine);
});

export const deleteWine = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id as string;
  await wineService.deleteWine(id, req.userId!, req.userRole!);
  res.status(200).json({ message: 'Wine deleted' });
});
