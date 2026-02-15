import { HydratedDocument } from 'mongoose';
import Review, { IReview } from '@/models/reviewModel';
import Wine from '@/models/wineModel';
import HttpError from '@/utils/HttpError';

export class ReviewService {
  public async getReviewsByWine(wineId: string): Promise<HydratedDocument<IReview>[]> {
    const reviews = await Review.find({ wineId })
      .populate('userId', 'firstName lastName')
      .sort({ createdAt: -1 })
      .exec();
    return reviews;
  }

  public async createReview(
    wineId: string,
    userId: string,
    reviewData: { rating: number; comment?: string },
  ): Promise<HydratedDocument<IReview>> {
    const wine = await Wine.findById(wineId);
    if (!wine) {
      throw new HttpError('Wine not found.', 404);
    }

    const existingReview = await Review.findOne({ wineId, userId });
    if (existingReview) {
      throw new HttpError('You have already reviewed this wine.', 400);
    }

    const review = await Review.create({
      wineId,
      userId,
      rating: reviewData.rating,
      comment: reviewData.comment,
    });

    return review;
  }

  public async updateReview(
    reviewId: string,
    userId: string,
    updateData: { rating?: number; comment?: string },
  ): Promise<HydratedDocument<IReview> | null> {
    const review = await Review.findById(reviewId);

    if (!review) {
      throw new HttpError('Review not found.', 404);
    }

    if (review.userId.toString() !== userId) {
      throw new HttpError('You are not authorized to update this review.', 403);
    }

    if (updateData.rating) {
      review.rating = updateData.rating;
    }
    if (updateData.comment !== undefined) {
      review.comment = updateData.comment;
    }

    await review.save();

    return review;
  }

  public async deleteReview(reviewId: string, userId: string, userRole: string): Promise<void> {
    const review = await Review.findById(reviewId);

    if (!review) {
      throw new HttpError('Review not found.', 404);
    }

    if (review.userId.toString() !== userId && userRole !== 'ADMIN') {
      throw new HttpError('You are not authorized to delete this review.', 403);
    }

    await Review.findByIdAndDelete(reviewId);
  }
}
