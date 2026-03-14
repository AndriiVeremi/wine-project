import { ReviewService } from '@/services/reviewService';
import Review from '@/models/reviewModel';
import Wine from '@/models/wineModel';

jest.mock('@/models/reviewModel');
jest.mock('@/models/wineModel');

describe('ReviewService', () => {
  let reviewService: ReviewService;

  beforeEach(() => {
    reviewService = new ReviewService();
    jest.clearAllMocks();
  });

  describe('getReviewsByWine', () => {
    it('should return reviews for a given wineId', async () => {
      const wineId = '60d21b4667d0d8992e610c99';
      const mockReviews = [
        { _id: '1', comment: 'Great wine', rating: 5 },
        { _id: '2', comment: 'Nice', rating: 4 },
      ];

      (Review.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockReviews),
      });

      const result = await reviewService.getReviewsByWine(wineId);

      expect(Review.find).toHaveBeenCalled();
      expect(result).toEqual(mockReviews);
    });
  });

  describe('createReview', () => {
    it('should create a new review and update wine rating', async () => {
      const userId = '60d21b4667d0d8992e610c81';
      const wineId = '60d21b4667d0d8992e610c99';
      const reviewData = { wineId, rating: 5, comment: 'Excellent!' };

      (Wine.findById as jest.Mock).mockResolvedValue({ _id: wineId });
      (Review.findOne as jest.Mock).mockResolvedValue(null);
      (Review.create as jest.Mock).mockResolvedValue({ ...reviewData, userId });
      (Review.find as jest.Mock).mockResolvedValue([reviewData]);
      (Wine.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

      const result = await reviewService.createReview(userId, reviewData);

      expect(Review.create).toHaveBeenCalled();
      expect(result).toBeDefined();
    });
  });

  describe('deleteReview', () => {
    it('should delete a review if user is owner', async () => {
      const reviewId = 'rev123';
      const userId = 'user123';
      const mockReview = { _id: reviewId, userId: { toString: () => userId }, wineId: 'wine123' };

      (Review.findById as jest.Mock).mockResolvedValue(mockReview);
      (Review.findByIdAndDelete as jest.Mock).mockResolvedValue(mockReview);
      (Review.find as jest.Mock).mockResolvedValue([]);
      (Wine.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

      await reviewService.deleteReview(reviewId, userId, 'USER');

      expect(Review.findByIdAndDelete).toHaveBeenCalledWith(reviewId);
    });
  });
});
