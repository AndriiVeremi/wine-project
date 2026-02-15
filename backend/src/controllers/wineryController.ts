import { Request, Response } from 'express';
import { AuthenticatedRequest } from '@/middleware/auth';
import HttpError from '@/utils/HttpError';
import * as wineryService from '@/services/wineryService';
import * as userService from '@/services/userService';
import Winery from '@/models/wineryModel';

export const registerWinery = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.userId) {
    throw new HttpError('Unauthorized', 401);
  }

  const ownerId = req.userId;
  const wineryData = req.body;

  try {
    const newWinery = await wineryService.createWinery(ownerId, wineryData);
    await userService.updateUserRole(ownerId, 'WINERY_OWNER');

    res.status(201).json({
      message: 'Winery registered successfully.',
      winery: newWinery,
    });
  } catch (error: unknown) {
    console.error(error);
    const err = error as { statusCode?: number; message?: string };
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const getWineries = async (req: Request, res: Response) => {
  try {
    const params = req.query;
    const { wineries, totalCount, page, limit, totalPages } =
      await wineryService.getWineries(params);

    res.status(200).json({
      wineries,
      totalCount,
      page,
      limit,
      totalPages,
    });
  } catch (error: unknown) {
    console.error(error);
    const err = error as { statusCode?: number; message?: string };
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const getWinery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const winery = await wineryService.getWineryById(id as string);
    res.status(200).json(winery);
  } catch (error: unknown) {
    console.error(error);
    const err = error as { statusCode?: number; message?: string };
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const updateWinery = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.userId || !req.userRole) {
    throw new HttpError('Неавторизовано', 401);
  }

  const { id } = req.params;
  const updateData = req.body;
  const userId = req.userId;
  const userRole = req.userRole;

  try {
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
  } catch (error: unknown) {
    console.error(error);
    const err = error as { statusCode?: number; message?: string };
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};
