import { Request, Response } from 'express';
import { AuthenticatedRequest } from '@/middleware/auth';
import HttpError from '@/utils/HttpError';
import * as wineryService from '@/services/wineryService';
import * as userService from '@/services/userService';
import Winery from '@/models/wineryModel';
import User from '@/models/userModel';
import ctrlWrapper from '@/utils/ctrlWrapper';
import { uploadFile } from '@/services/firebase';

export const registerWinery = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const ownerId = req.userId!;
  const wineryData = { ...req.body };

  // Parse JSON fields if they are strings (common in multipart/form-data)
  if (typeof wineryData.whereToBuy === 'string') {
    wineryData.whereToBuy = JSON.parse(wineryData.whereToBuy);
  }
  if (typeof wineryData.coordinates === 'string') {
    wineryData.coordinates = JSON.parse(wineryData.coordinates);
  }

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (files?.logo && files.logo[0]) {
    wineryData.logoUrl = await uploadFile(files.logo[0], 'wineries/logos');
  }

  if (files?.images) {
    const imageUrls = await Promise.all(
      files.images.map((file) => uploadFile(file, 'wineries/gallery')),
    );
    wineryData.galleryUrl = imageUrls;
  }

  const newWinery = await wineryService.createWinery(ownerId, wineryData);
  await userService.updateUserRole(ownerId, 'WINERY_OWNER');

  res.status(201).json({
    message: 'Winery registered successfully.',
    winery: newWinery,
  });
});

export const getWineries = ctrlWrapper(async (req: Request, res: Response) => {
  const params = req.query;
  const { wineries, totalCount, page, limit, totalPages } = await wineryService.getAllWineries(
    params as any,
  );

  res.status(200).json({
    wineries,
    totalCount,
    page,
    limit,
    totalPages,
  });
});

export const getWinery = ctrlWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const winery = await wineryService.getWineryById(id as string);
  res.status(200).json(winery);
});

export const updateWinery = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const updateData = { ...req.body };
  const userId = req.userId!;
  const userRole = req.userRole!;

  const winery = await Winery.findById(id as string);

  if (!winery) {
    throw new HttpError('Winery not found.', 404);
  }

  const isOwner = winery.owner.toString() === userId.toString();
  const isAdmin = userRole === 'ADMIN';

  if (!isOwner && !isAdmin) {
    throw new HttpError('You do not have permission to update this winery.', 403);
  }

  // Parse JSON fields if they are strings
  if (typeof updateData.whereToBuy === 'string') {
    updateData.whereToBuy = JSON.parse(updateData.whereToBuy);
  }
  if (typeof updateData.coordinates === 'string') {
    updateData.coordinates = JSON.parse(updateData.coordinates);
  }

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (files?.logo && files.logo[0]) {
    updateData.logoUrl = await uploadFile(files.logo[0], 'wineries/logos');
  }

  if (files?.images) {
    const imageUrls = await Promise.all(
      files.images.map((file) => uploadFile(file, 'wineries/gallery')),
    );
    // Append or replace? Usually for gallery we might want to append or specify which ones to replace.
    // For now, let's replace for simplicity or just append if needed.
    // Let's assume we replace the whole gallery if new images are provided.
    updateData.galleryUrl = imageUrls;
  }

  const updatedWinery = await wineryService.updateWinery(id as string, updateData);

  res.status(200).json({
    message: 'Successfully updated.',
    winery: updatedWinery,
  });
});

export const deleteWinery = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId!;

  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError('User not found', 404);
  }

  await wineryService.deleteWineryById(id as string, user);

  res.status(204).send();
});

export const toggleVipStatus = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const winery = await Winery.findById(id as string);

  if (!winery) {
    throw new HttpError('Winery not found.', 404);
  }

  winery.isVip = !winery.isVip;
  await winery.save();

  res.status(200).json({
    message: `VIP status updated to ${winery.isVip}`,
    winery,
  });
});
