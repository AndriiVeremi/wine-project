jest.mock('@/models/userModel');
jest.mock('@/models/wineModel');
jest.mock('@/services/firebase', () => ({
  firebaseAdmin: {
    auth: jest.fn(() => ({
      setCustomUserClaims: jest.fn().mockResolvedValue(undefined),
    })),
  },
}));

import { Types } from 'mongoose';
import { default as UserModel } from '@/models/userModel';
import { default as WineModel } from '@/models/wineModel';
import * as userService from '@/services/userService';
import HttpError from '@/utils/HttpError';

const mockFindOne = UserModel.findOne as jest.Mock;
const mockFindById = UserModel.findById as jest.Mock;
const mockWineFindById = WineModel.findById as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('userService', () => {
  describe('getUserProfileByFirebaseUid', () => {
    it('should throw error if firebaseUid is empty', async () => {
      await expect(userService.getUserProfileByFirebaseUid('')).rejects.toThrow(
        new HttpError('Firebase UID is required', 400),
      );
    });

    it('should throw 404 if user not found', async () => {
      mockFindOne.mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        then: jest.fn((resolve) => resolve(null)), // Mock the final resolution of the query chain
      }));

      await expect(userService.getUserProfileByFirebaseUid('nonexistent-uid')).rejects.toThrow(
        new HttpError('User profile not found.', 404),
      );
    });

    it('should return user if found', async () => {
      const mockUser = {
        _id: 'user-id-123',
        firebaseUid: 'test-uid',
        firstName: 'Andrii',
        lastName: 'Veremii',
        email: 'Dashuk10@example.com',
        role: 'USER',
      };
      mockFindOne.mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        then: jest.fn((resolve) => resolve(mockUser)), // Mock the final resolution of the query chain
      }));

      const result = await userService.getUserProfileByFirebaseUid('test-uid');
      expect(result).toEqual(mockUser);
      expect(mockFindOne).toHaveBeenCalledWith({ firebaseUid: 'test-uid' });
    });
  });

  describe('getUserFavorites', () => {
    it('should throw 404 if user not found', async () => {
      mockFindById.mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue(null),
      }));
      await expect(userService.getUserFavorites('nonexistent-id')).rejects.toThrow(
        new HttpError('User not found', 404),
      );
    });

    it('should return empty array if no favorites', async () => {
      const mockUserWithNoFavorites = { favoriteWines: [] };
      mockFindById.mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue(mockUserWithNoFavorites),
      }));

      const result = await userService.getUserFavorites('user-id');
      expect(result).toEqual([]);
    });
  });

  describe('addFavoriteWine', () => {
    const userId = '65d5ec49e03f7c5558f3d6b1';
    const wineId = '65d5ec49e03f7c5558f3d6b5';
    const mockUser = {
      favoriteWines: [] as Types.ObjectId[],
      save: jest.fn().mockResolvedValue(true),
    };
    const mockWine = { _id: wineId };

    it('should throw 404 if user not found', async () => {
      mockFindById.mockResolvedValue(null);
      await expect(userService.addFavoriteWine(userId, wineId)).rejects.toThrow(
        new HttpError('User not found', 404),
      );
    });

    it('should throw 404 if wine not found', async () => {
      mockFindById.mockResolvedValue(mockUser);
      mockWineFindById.mockResolvedValue(null);
      await expect(userService.addFavoriteWine(userId, wineId)).rejects.toThrow(
        new HttpError('Wine not found', 404),
      );
    });

    it('should throw 400 if wine already in favorites', async () => {
      const userWithFavorite = {
        favoriteWines: [new Types.ObjectId(wineId)],
        save: jest.fn(),
      };
      mockFindById.mockResolvedValue(userWithFavorite);
      mockWineFindById.mockResolvedValue(mockWine);
      await expect(userService.addFavoriteWine(userId, wineId)).rejects.toThrow(
        new HttpError('Wine is already in favorites', 400),
      );
    });

    it('should add wine to favorites successfully', async () => {
      const user = {
        favoriteWines: [] as Types.ObjectId[],
        save: jest.fn().mockResolvedValue(this),
      };
      mockFindById.mockResolvedValue(user);
      mockWineFindById.mockResolvedValue({ _id: wineId });

      const result = await userService.addFavoriteWine(userId, wineId);

      expect(user.favoriteWines).toHaveLength(1);
      expect(user.favoriteWines[0]).toBeInstanceOf(Types.ObjectId);
      expect(user.favoriteWines[0].toString()).toBe(wineId);
      expect(user.save).toHaveBeenCalled();
      expect(result).toEqual({ message: 'Wine added to favorites' });
    });
  });

  describe('removeFavoriteWine', () => {
    const userId = '65d5ec49e03f7c5558f3d6b1';
    const wineId = '65d5ec49e03f7c5558f3d6b5';
    const wineObjectId = new Types.ObjectId(wineId);

    it('should throw 404 if user not found', async () => {
      mockFindById.mockResolvedValue(null);
      await expect(userService.removeFavoriteWine(userId, wineId)).rejects.toThrow(
        new HttpError('User not found', 404),
      );
    });

    it('should throw 404 if wine not in favorites', async () => {
      const user = { favoriteWines: [], save: jest.fn() };
      mockFindById.mockResolvedValue(user);
      await expect(userService.removeFavoriteWine(userId, wineId)).rejects.toThrow(
        new HttpError('Wine not found in favorites', 404),
      );
    });

    it('should remove wine from favorites successfully', async () => {
      const user = {
        favoriteWines: [wineObjectId],
        save: jest.fn().mockResolvedValue(this),
      };
      mockFindById.mockResolvedValue(user);

      const result = await userService.removeFavoriteWine(userId, wineId);

      expect(user.favoriteWines).toHaveLength(0);
      expect(user.save).toHaveBeenCalled();
      expect(result).toEqual({ message: 'Wine removed from favorites' });
    });
  });
});
