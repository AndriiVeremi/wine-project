import { Request, Response, NextFunction } from 'express';
import { ReviewService } from '@/services/reviewService';
import { AuthenticatedRequest } from '@/middleware/auth';

const reviewService = new ReviewService();

export const getWineReviews = async (req: Request, res: Response, _next: NextFunction) => {
  const wineId = req.params.id as string;
  const reviews = await reviewService.getReviewsByWine(wineId);
  res.status(200).json(reviews);
};

export const createReview = async (
  req: AuthenticatedRequest,
  res: Response,
  _next: NextFunction,
) => {
  const wineId = req.params.id as string;
  const newReview = await reviewService.createReview(wineId, req.userId!, req.body);
  res.status(201).json(newReview);
};

export const updateReview = async (
  req: AuthenticatedRequest,
  res: Response,
  _next: NextFunction,
) => {
  const reviewId = req.params.reviewId as string;
  const updatedReview = await reviewService.updateReview(reviewId, req.userId!, req.body);
  res.status(200).json(updatedReview);
};

export const deleteReview = async (
  req: AuthenticatedRequest,
  res: Response,
  _next: NextFunction,
) => {
  const reviewId = req.params.reviewId as string;
  await reviewService.deleteReview(reviewId, req.userId!, req.userRole!);
  res.status(200).json({ message: 'Review deleted successfully' });
};
