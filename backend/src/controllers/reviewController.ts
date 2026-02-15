import { Request, Response, NextFunction } from 'express';
import { ReviewService } from '@/services/reviewService';
import HttpError from '@/utils/HttpError';
import { AuthenticatedRequest } from '@/middleware/auth';

const reviewService = new ReviewService();

export const getWineReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wineId = req.params.wineId as string;
    const reviews = await reviewService.getReviewsByWine(wineId);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const createReview = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.userId) {
      throw new HttpError('User not authenticated', 401);
    }
    const wineId = req.params.wineId as string;
    const newReview = await reviewService.createReview(wineId, req.userId, req.body);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.userId) {
      throw new HttpError('User not authenticated', 401);
    }
    const reviewId = req.params.reviewId as string;
    const updatedReview = await reviewService.updateReview(reviewId, req.userId, req.body);
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.userId || !req.userRole) {
      throw new HttpError('User not authenticated', 401);
    }
    const reviewId = req.params.reviewId as string;
    await reviewService.deleteReview(reviewId, req.userId, req.userRole);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};
