import { Model, Types } from 'mongoose';
import Review from '@/models/reviewModel';
import Wine from '@/models/wineModel';
import Winery from '@/models/wineryModel';
import Tour from '@/models/tourModel';
import HttpError from '@/utils/HttpError';

export async function updateRating(targetId: string, model: Model<unknown>) {
  const filter =
    model.modelName === 'Wine'
      ? { wineId: targetId }
      : model.modelName === 'Winery'
        ? { wineryId: targetId }
        : { tourId: targetId };

  const reviews = await Review.find(filter);
  if (!reviews) return;

  const total = reviews.length;
  const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
  const average = total > 0 ? sum / total : 0;

  await model.findByIdAndUpdate(targetId, {
    averageRating: average,
    totalReviews: total,
  });
}

export class ReviewService {
  public async getAllReviews(page: number = 1, limit: number = 10, type?: string) {
    const skip = (page - 1) * limit;

    let query = {};
    if (type === 'wine') query = { wineId: { $exists: true } };
    else if (type === 'winery') query = { wineryId: { $exists: true } };
    else if (type === 'tour') query = { tourId: { $exists: true } };

    const [reviews, total] = await Promise.all([
      Review.find(query)
        .populate('userId', 'firstName lastName email avatarUrl')
        .populate('wineId', 'name imageUrl')
        .populate('wineryId', 'name logoUrl')
        .populate('tourId', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      Review.countDocuments(query),
    ]);
    const totalPages = Math.ceil(total / limit);
    return { reviews, total, totalPages, page };
  }

  public async getReviewById(id: string) {
    const review = await Review.findById(id)
      .populate('userId', 'firstName lastName avatarUrl')
      .exec();
    if (!review) throw new HttpError('Review not found', 404);
    return review;
  }

  public async getReviewsByWine(wineId: string) {
    const query = Types.ObjectId.isValid(wineId)
      ? { $or: [{ wineId }, { wineId: new Types.ObjectId(wineId) }] }
      : { wineId };

    return await Review.find(query)
      .populate('userId', 'firstName lastName avatarUrl')
      .sort({ createdAt: -1 })
      .exec();
  }

  public async getReviewsByWinery(wineryId: string) {
    const query = Types.ObjectId.isValid(wineryId)
      ? { $or: [{ wineryId }, { wineryId: new Types.ObjectId(wineryId) }] }
      : { wineryId };

    return await Review.find(query)
      .populate('userId', 'firstName lastName avatarUrl')
      .sort({ createdAt: -1 })
      .exec();
  }

  public async getReviewsByTour(tourId: string) {
    const query = Types.ObjectId.isValid(tourId)
      ? { $or: [{ tourId }, { tourId: new Types.ObjectId(tourId) }] }
      : { tourId };

    return await Review.find(query)
      .populate('userId', 'firstName lastName avatarUrl')
      .sort({ createdAt: -1 })
      .exec();
  }

  public async getReviewsByUser(userId: string, page: number = 1, limit: number = 5) {
    const skip = (page - 1) * limit;
    const [reviews, total] = await Promise.all([
      Review.find({ userId })
        .populate('wineId', 'name imageUrl')
        .populate('wineryId', 'name logoUrl')
        .populate('tourId', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      Review.countDocuments({ userId }),
    ]);
    return { reviews, total };
  }

  public async createReview(
    userId: string,
    data: { wineId?: string; wineryId?: string; tourId?: string; rating: number; comment?: string },
  ) {
    const { wineId, wineryId, tourId } = data;
    if (!wineId && !wineryId && !tourId) throw new HttpError('Target required', 400);

    const review = await Review.create({ ...data, userId });

    if (wineId) await updateRating(wineId, Wine);
    if (wineryId) await updateRating(wineryId, Winery);
    if (tourId) await updateRating(tourId, Tour);

    return review;
  }

  public async deleteReview(id: string, userId: string, role: string) {
    const review = await Review.findById(id);
    if (!review) throw new HttpError('Not found', 404);

    if (review.userId.toString() !== userId && role !== 'ADMIN') {
      throw new HttpError('Forbidden', 403);
    }

    const { wineId, wineryId, tourId } = review;
    await Review.findByIdAndDelete(id);

    if (wineId) await updateRating(wineId.toString(), Wine);
    if (wineryId) await updateRating(wineryId.toString(), Winery);
    if (tourId) await updateRating(tourId.toString(), Tour);
  }
}
