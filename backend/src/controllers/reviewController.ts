import { Request, Response } from 'express';
import { ReviewService } from '@/services/reviewService';
import { AuthenticatedRequest } from '@/middleware/auth';
import ctrlWrapper from '@/utils/ctrlWrapper';

const reviewService = new ReviewService();

export const getAllReviews = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = await reviewService.getAllReviews(page, limit);

  res.status(200).json({
    reviews: result.reviews,
    total: result.total,
    page,
    totalPages: Math.ceil(result.total / limit),
  });
});

export const getWineReviews = ctrlWrapper(async (req: Request, res: Response) => {
  const wineId = req.params.id as string;
  const reviews = await reviewService.getReviewsByWine(wineId);
  res.status(200).json(reviews);
});

export const getUserReviews = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;

  const result = await reviewService.getReviewsByUser(req.userId!, page, limit);

  res.status(200).json({
    reviews: result.reviews,
    total: result.total,
    page,
    totalPages: Math.ceil(result.total / limit),
  });
});

export const getWineReviewById = ctrlWrapper(async (req: Request, res: Response) => {
  const reviewId = req.params.reviewId as string;
  const review = await reviewService.getReviewById(reviewId);
  res.status(200).json(review);
});

export const createReview = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const wineId = req.params.id as string;
  const newReview = await reviewService.createReview(wineId, req.userId!, req.body);
  res.status(201).json(newReview);
});

export const updateReview = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const reviewId = req.params.reviewId as string;
  const updatedReview = await reviewService.updateReview(reviewId, req.userId!, req.body);
  res.status(200).json(updatedReview);
});

export const deleteReview = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const reviewId = req.params.reviewId as string;
  await reviewService.deleteReview(reviewId, req.userId!, req.userRole!);
  res.status(200).json({ message: 'Review deleted successfully' });
});
