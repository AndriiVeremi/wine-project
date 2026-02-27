import { Request, Response } from 'express';
import { AuthenticatedRequest } from '@/middleware/auth';
import HttpError from '@/utils/HttpError';
import * as wineryService from '@/services/wineryService';
import * as userService from '@/services/userService';
import Winery from '@/models/wineryModel';
import User from '@/models/userModel';
import ctrlWrapper from '@/utils/ctrlWrapper';

export const registerWinery = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const ownerId = req.userId!;
  const wineryData = req.body;

  const newWinery = await wineryService.createWinery(ownerId, wineryData);
  await userService.updateUserRole(ownerId, 'WINERY_OWNER');

  res.status(201).json({
    message: 'Winery registered successfully.',
    winery: newWinery,
  });
});

export const getWineries = ctrlWrapper(async (req: Request, res: Response) => {
  const params = req.query;
  const { wineries, totalCount, page, limit, totalPages } = await wineryService.getWineries(params);

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
  const updateData = req.body;
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
