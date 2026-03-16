import { Request, Response } from 'express';
import { ReviewService } from '@/services/reviewService';
import { AuthenticatedRequest } from '@/middleware/auth';
import ctrlWrapper from '@/utils/ctrlWrapper';

const reviewService = new ReviewService();

export const getAllReviews = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const type = req.query.type as string;
  const result = await reviewService.getAllReviews(page, limit, type);
  res.status(200).json(result);
});

export const getReviews = ctrlWrapper(async (req: Request, res: Response) => {
  const targetId = req.params.id as string;
  const url = req.originalUrl;

  let reviews;
  if (url.includes('/wines/')) reviews = await reviewService.getReviewsByWine(targetId);
  else if (url.includes('/wineries/')) reviews = await reviewService.getReviewsByWinery(targetId);
  else if (url.includes('/tours/')) reviews = await reviewService.getReviewsByTour(targetId);

  res.status(200).json(reviews || []);
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

export const getReviewById = ctrlWrapper(async (req: Request, res: Response) => {
  const reviewId = req.params.reviewId as string;
  const review = await reviewService.getReviewById(reviewId);
  res.status(200).json(review);
});

export const createReview = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const data = { ...req.body };
  const targetId = req.params.id as string;
  const url = req.originalUrl;

  if (url.includes('/wines/')) data.wineId = targetId;
  else if (url.includes('/wineries/')) data.wineryId = targetId;
  else if (url.includes('/tours/')) data.tourId = targetId;

  const newReview = await reviewService.createReview(req.userId!, data);
  res.status(201).json(newReview);
});

export const deleteReview = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
  const reviewId = req.params.reviewId as string;
  await reviewService.deleteReview(reviewId, req.userId!, req.userRole!);
  res.status(200).json({ message: 'Deleted' });
});
