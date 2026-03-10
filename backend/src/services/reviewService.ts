import { HydratedDocument } from 'mongoose';
import Review, { IReview } from '@/models/reviewModel';
import Wine from '@/models/wineModel';
import HttpError from '@/utils/HttpError';

async function updateWineRating(wineId: string) {
  const reviews = await Review.find({ wineId });
  if (!reviews || !Array.isArray(reviews)) return;

  const total = reviews.length;
  let sum = 0;
  for (const r of reviews) {
    sum += r.rating || 0;
  }

  const average = total > 0 ? sum / total : 0;

  await Wine.findByIdAndUpdate(wineId, {
    averageRating: average,
    totalReviews: total,
  });
}

export class ReviewService {
  public async getReviewsByWine(wineId: string): Promise<HydratedDocument<IReview>[]> {
    const reviews = await Review.find({ wineId })
      .populate('userId', 'firstName lastName avatarUrl')
      .sort({ createdAt: -1 })
      .exec();
    return reviews;
  }

  public async getReviewsByUser(
    userId: string,
    page: number = 1,
    limit: number = 5,
  ): Promise<{ reviews: HydratedDocument<IReview>[]; total: number }> {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      Review.find({ userId })
        .populate('wineId', 'name imageUrl')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      Review.countDocuments({ userId }),
    ]);

    return { reviews, total };
  }

  public async getReviewById(reviewId: string): Promise<HydratedDocument<IReview>> {
    const review = await Review.findById(reviewId)
      .populate('userId', 'firstName lastName avatarUrl')
      .exec();

    if (!review) {
      throw new HttpError('Review not found.', 404);
    }

    return review;
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

    await updateWineRating(wineId);

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

    if (updateData.rating !== undefined) {
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

    const wineId = review.wineId?.toString();
    await Review.findByIdAndDelete(reviewId);
    if (wineId) {
      await updateWineRating(wineId);
    }
  }
}
