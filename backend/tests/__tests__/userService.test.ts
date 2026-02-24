jest.mock('@/models/userModel', () => ({
  default: {
    findOne: jest.fn(),
    findById: jest.fn(),
  },
  __esModule: true,
}));

jest.mock('@/models/wineModel', () => ({
  default: {
    findById: jest.fn(),
  },
  __esModule: true,
}));

jest.mock('@/services/firebase', () => ({
  firebaseAdmin: {
    auth: jest.fn(() => ({
      setCustomUserClaims: jest.fn().mockResolvedValue(undefined),
    })),
  },
}));

import { default as UserModel } from '@/models/userModel';
import { default as WineModel } from '@/models/wineModel';
import * as userService from '@/services/userService';

const mockQueryBuilder = {
  select: jest.fn().mockReturnThis(),
  populate: jest.fn().mockReturnThis(),
};

const mockFindOne = UserModel.findOne as jest.Mock;
const mockFindById = UserModel.findById as jest.Mock;
const mockWineFindById = WineModel.findById as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();

  mockFindOne.mockReturnValue({
    ...mockQueryBuilder,
    then: (resolve: (value: unknown) => void) => resolve(null),
  });
  mockFindById.mockReturnValue({
    ...mockQueryBuilder,
    then: (resolve: (value: unknown) => void) => resolve(null),
  });
});

describe('userService', () => {
  describe('getUserProfileByFirebaseUid', () => {
    it('should throw error if firebaseUid is empty', async () => {
      await expect(userService.getUserProfileByFirebaseUid('')).rejects.toThrow(
        'Firebase UID is required',
      );
    });

    it('should throw 404 if user not found', async () => {
      const createNullQuery = () => ({
        select: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(null),
          then: (resolve: (value: unknown) => void) => resolve(null),
        }),
        then: (resolve: (value: unknown) => void) => resolve(null),
      });
      mockFindOne.mockReturnValue(createNullQuery());

      await expect(userService.getUserProfileByFirebaseUid('nonexistent-uid')).rejects.toThrow(
        'User profile not found.',
      );
    });

    it('should return user if found', async () => {
      const mockUser = {
        _id: 'user-id-123',
        firebaseUid: 'test-uid',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'USER',
      };

      const createUserQuery = () => ({
        select: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(mockUser),
          then: (resolve: (value: unknown) => void) => resolve(mockUser),
        }),
        then: (resolve: (value: unknown) => void) => resolve(mockUser),
      });
      mockFindOne.mockReturnValue(createUserQuery());

      const result = await userService.getUserProfileByFirebaseUid('test-uid');

      expect(result).toEqual(mockUser);
      expect(mockFindOne).toHaveBeenCalledWith({ firebaseUid: 'test-uid' });
    });
  });

  describe('getUserFavorites', () => {
    it('should throw 404 if user not found', async () => {
      mockFindById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
        then: (resolve: (value: unknown) => void) => resolve(null),
      });

      await expect(userService.getUserFavorites('nonexistent-id')).rejects.toThrow(
        'User not found',
      );
    });

    it('should return empty array if no favorites', async () => {
      const mockUserWithNoFavorites = { favoriteWines: [] };

      mockFindById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockUserWithNoFavorites),
        then: (resolve: (value: unknown) => void) => resolve(mockUserWithNoFavorites),
      });

      const result = await userService.getUserFavorites('user-id');

      expect(result).toEqual([]);
    });
  });

  describe('addFavoriteWine', () => {
    it('should throw 404 if user not found', async () => {
      mockFindById.mockResolvedValue(null);

      await expect(userService.addFavoriteWine('user-id', 'wine-id')).rejects.toThrow(
        'User not found',
      );
    });

    it('should throw 404 if wine not found', async () => {
      mockFindById.mockResolvedValueOnce({ favoriteWines: [] });
      mockWineFindById.mockResolvedValue(null);

      await expect(userService.addFavoriteWine('user-id', 'wine-id')).rejects.toThrow(
        'Wine not found',
      );
    });

    it('should throw 400 if wine already in favorites', async () => {
      mockFindById.mockResolvedValue({
        favoriteWines: [{ toString: () => 'wine-id' }],
      });
      mockWineFindById.mockResolvedValue({ _id: 'wine-id' });

      await expect(userService.addFavoriteWine('user-id', 'wine-id')).rejects.toThrow(
        'Wine is already in favorites',
      );
    });
  });

  describe('removeFavoriteWine', () => {
    it('should throw 404 if user not found', async () => {
      mockFindById.mockResolvedValue(null);

      await expect(userService.removeFavoriteWine('user-id', 'wine-id')).rejects.toThrow(
        'User not found',
      );
    });

    it('should throw 404 if wine not in favorites', async () => {
      mockFindById.mockResolvedValue({
        favoriteWines: [],
        save: jest.fn(),
      });

      await expect(userService.removeFavoriteWine('user-id', 'wine-id')).rejects.toThrow(
        'Wine not found in favorites',
      );
    });
  });
});
