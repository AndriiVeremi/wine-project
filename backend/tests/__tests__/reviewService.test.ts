import { ReviewService } from '@/services/reviewService';
import Review from '@/models/reviewModel';
import Wine from '@/models/wineModel';
import HttpError from '@/utils/HttpError';

jest.mock('@/models/reviewModel');
jest.mock('@/models/wineModel');

describe('ReviewService', () => {
  let reviewService: ReviewService;

  beforeEach(() => {
    reviewService = new ReviewService();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(reviewService).toBeDefined();
  });

  describe('getReviewsByWine', () => {
    it('should return reviews for a given wineId', async () => {
      const wineId = 'wine123';
      const reviews = [{ text: 'Great wine!' }, { text: 'Not bad' }];
      const exec = jest.fn().mockResolvedValue(reviews);
      const sort = jest.fn().mockReturnValue({ exec });
      const populate = jest.fn().mockReturnValue({ sort });
      (Review.find as jest.Mock).mockReturnValue({
        populate,
        sort,
      });

      const result = await reviewService.getReviewsByWine(wineId);

      expect(Review.find).toHaveBeenCalledWith({ wineId });
      expect(populate).toHaveBeenCalledWith('userId', 'firstName lastName');
      expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual(reviews);
    });
  });

  describe('createReview', () => {
    const wineId = 'wine123';
    const userId = 'user123';
    const reviewData = { rating: 5, comment: 'Excellent!' };

    it('should create a review successfully', async () => {
      (Wine.findById as jest.Mock).mockResolvedValue(true);
      (Review.findOne as jest.Mock).mockResolvedValue(null);
      (Review.create as jest.Mock).mockResolvedValue({ ...reviewData, wineId, userId });

      const result = await reviewService.createReview(wineId, userId, reviewData);

      expect(Wine.findById).toHaveBeenCalledWith(wineId);
      expect(Review.findOne).toHaveBeenCalledWith({ wineId, userId });
      expect(Review.create).toHaveBeenCalledWith({ ...reviewData, wineId, userId });
      expect(result).toEqual({ ...reviewData, wineId, userId });
    });

    it('should throw an error if wine not found', async () => {
      (Wine.findById as jest.Mock).mockResolvedValue(null);

      await expect(reviewService.createReview(wineId, userId, reviewData)).rejects.toThrow(
        new HttpError('Wine not found.', 404),
      );
    });

    it('should throw an error if user has already reviewed the wine', async () => {
      (Wine.findById as jest.Mock).mockResolvedValue(true);
      (Review.findOne as jest.Mock).mockResolvedValue(true);

      await expect(reviewService.createReview(wineId, userId, reviewData)).rejects.toThrow(
        new HttpError('You have already reviewed this wine.', 400),
      );
    });
  });

  describe('updateReview', () => {
    const reviewId = 'review123';
    const userId = 'user123';
    const updateData = { rating: 4, comment: 'Pretty good.' };
    const mockReview = {
      _id: reviewId,
      userId: { toString: () => userId },
      rating: 5,
      comment: 'Excellent!',
      save: jest.fn(),
    };

    it('should update a review successfully', async () => {
      (Review.findById as jest.Mock).mockResolvedValue(mockReview);
      mockReview.save.mockResolvedValue({ ...mockReview, ...updateData });

      const result = await reviewService.updateReview(reviewId, userId, updateData);

      expect(Review.findById).toHaveBeenCalledWith(reviewId);
      expect(mockReview.save).toHaveBeenCalled();
      expect(result?.rating).toBe(updateData.rating);
      expect(result?.comment).toBe(updateData.comment);
    });

    it('should throw an error if review not found', async () => {
      (Review.findById as jest.Mock).mockResolvedValue(null);

      await expect(reviewService.updateReview(reviewId, userId, updateData)).rejects.toThrow(
        new HttpError('Review not found.', 404),
      );
    });

    it('should throw an error if user is not authorized to update', async () => {
      const otherUserId = 'otherUser';
      const reviewFromOtherUser = { ...mockReview, userId: { toString: () => otherUserId } };
      (Review.findById as jest.Mock).mockResolvedValue(reviewFromOtherUser);

      await expect(reviewService.updateReview(reviewId, userId, updateData)).rejects.toThrow(
        new HttpError('You are not authorized to update this review.', 403),
      );
    });
  });

  describe('deleteReview', () => {
    const reviewId = 'review123';
    const userId = 'user123';
    const mockReview = {
      _id: reviewId,
      userId: { toString: () => userId },
    };

    it('should delete a review successfully by owner', async () => {
      (Review.findById as jest.Mock).mockResolvedValue(mockReview);
      (Review.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

      await reviewService.deleteReview(reviewId, userId, 'USER');

      expect(Review.findById).toHaveBeenCalledWith(reviewId);
      expect(Review.findByIdAndDelete).toHaveBeenCalledWith(reviewId);
    });

    it('should delete a review successfully by admin', async () => {
      const otherUserId = 'otherUser';
      const reviewFromOtherUser = { ...mockReview, userId: { toString: () => otherUserId } };
      (Review.findById as jest.Mock).mockResolvedValue(reviewFromOtherUser);
      (Review.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

      await reviewService.deleteReview(reviewId, userId, 'ADMIN');

      expect(Review.findById).toHaveBeenCalledWith(reviewId);
      expect(Review.findByIdAndDelete).toHaveBeenCalledWith(reviewId);
    });

    it('should throw an error if review not found', async () => {
      (Review.findById as jest.Mock).mockResolvedValue(null);

      await expect(reviewService.deleteReview(reviewId, userId, 'USER')).rejects.toThrow(
        new HttpError('Review not found.', 404),
      );
    });

    it('should throw an error if user is not authorized to delete', async () => {
      const otherUserId = 'otherUser';
      const reviewFromOtherUser = { ...mockReview, userId: { toString: () => otherUserId } };
      (Review.findById as jest.Mock).mockResolvedValue(reviewFromOtherUser);

      await expect(reviewService.deleteReview(reviewId, userId, 'USER')).rejects.toThrow(
        new HttpError('You are not authorized to delete this review.', 403),
      );
    });
  });
});
