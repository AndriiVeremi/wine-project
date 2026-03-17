jest.mock('@/models/userModel');
jest.mock('@/models/wineModel');
jest.mock('@/services/firebase', () => ({
  firebaseAdmin: {
    auth: jest.fn(() => ({
      setCustomUserClaims: jest.fn().mockResolvedValue(undefined),
    })),
  },
  uploadFile: jest.fn().mockResolvedValue('http://mock-url.com/avatar.png'),
}));
import { Types } from 'mongoose';
import { default as UserModel, IUser } from '@/models/userModel';
import { default as WineModel } from '@/models/wineModel';
import * as userService from '@/services/userService';
import HttpError from '@/utils/HttpError';
import { uploadFile } from '@/services/firebase';
const mockFindOne = UserModel.findOne as jest.Mock;
const mockFindById = UserModel.findById as jest.Mock;
const mockWineFindById = WineModel.findById as jest.Mock;
const mockUploadFile = uploadFile as jest.Mock;
beforeEach(() => {
  jest.clearAllMocks();
});
describe('userService', () => {
  describe('getUserProfileByFirebaseUid', () => {
    it('error when firebaseUid is empty', async () => {
      await expect(userService.getUserProfileByFirebaseUid('')).rejects.toThrow(
        new HttpError('Firebase UID is required', 400),
      );
    });
    it('error when user not found', async () => {
      mockFindOne.mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        then: jest.fn((resolve) => resolve(null)), 
      }));
      await expect(userService.getUserProfileByFirebaseUid('bad-uid')).rejects.toThrow(
        new HttpError('User profile not found.', 404),
      );
    });
    it('get user when exist', async () => {
      const testUser = {
        _id: 'user-id-123',
        firebaseUid: 'test-uid',
        firstName: 'Andrii',
        lastName: 'Veremii',
        email: 'test@example.com',
        role: 'USER',
      };
      mockFindOne.mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        then: jest.fn((resolve) => resolve(testUser)), 
      }));
      const result = await userService.getUserProfileByFirebaseUid('test-uid');
      expect(result).toEqual(testUser);
      expect(mockFindOne).toHaveBeenCalledWith({ firebaseUid: 'test-uid' });
    });
  });
  describe('getUserFavorites', () => {
    it('error when user not found', async () => {
      mockFindById.mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue(null),
      }));
      await expect(userService.getUserFavorites('bad-id')).rejects.toThrow(
        new HttpError('User not found', 404),
      );
    });
    it('empty array when no favorites', async () => {
      const testUserNoFavorites = { favoriteWines: [] };
      mockFindById.mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue(testUserNoFavorites),
      }));
      const result = await userService.getUserFavorites('user-id');
      expect(result).toEqual([]);
    });
  });
  describe('addFavoriteWine', () => {
    const testUserId = '65d5ec49e03f7c5558f3d6b1';
    const testWineId = '65d5ec49e03f7c5558f3d6b5';
    const testUser = {
      favoriteWines: [] as Types.ObjectId[],
      save: jest.fn().mockResolvedValue(true),
    };
    const testWine = { _id: testWineId };
    it('error when user not found', async () => {
      mockFindById.mockResolvedValue(null);
      await expect(userService.addFavoriteWine(testUserId, testWineId)).rejects.toThrow(
        new HttpError('User not found', 404),
      );
    });
    it('error when wine not found', async () => {
      mockFindById.mockResolvedValue(testUser);
      mockWineFindById.mockResolvedValue(null);
      await expect(userService.addFavoriteWine(testUserId, testWineId)).rejects.toThrow(
        new HttpError('Wine not found', 404),
      );
    });
    it('error when wine already in favorites', async () => {
      const userWithFavorite = {
        favoriteWines: [new Types.ObjectId(testWineId)],
        save: jest.fn(),
      };
      mockFindById.mockResolvedValue(userWithFavorite);
      mockWineFindById.mockResolvedValue(testWine);
      await expect(userService.addFavoriteWine(testUserId, testWineId)).rejects.toThrow(
        new HttpError('Wine already in favorites', 400),
      );
    });
    it('add wine to favorites good', async () => {
      const user = {
        favoriteWines: [] as Types.ObjectId[],
        save: jest.fn().mockResolvedValue(this),
      };
      mockFindById.mockResolvedValue(user);
      mockWineFindById.mockResolvedValue({ _id: testWineId });
      const result = await userService.addFavoriteWine(testUserId, testWineId);
      expect(user.favoriteWines).toHaveLength(1);
      expect(user.favoriteWines[0]).toBeInstanceOf(Types.ObjectId);
      expect(user.favoriteWines[0].toString()).toBe(testWineId);
      expect(user.save).toHaveBeenCalled();
      expect(result).toEqual({ message: 'Wine added to favorites' });
    });
  });
  describe('removeFavoriteWine', () => {
    const testUserId = '65d5ec49e03f7c5558f3d6b1';
    const testWineId = '65d5ec49e03f7c5558f3d6b5';
    const testWineObjectId = new Types.ObjectId(testWineId);
    it('error when user not found', async () => {
      mockFindById.mockResolvedValue(null);
      await expect(userService.removeFavoriteWine(testUserId, testWineId)).rejects.toThrow(
        new HttpError('User not found', 404),
      );
    });
    it('error when wine not in favorites', async () => {
      const user = { favoriteWines: [], save: jest.fn() };
      mockFindById.mockResolvedValue(user);
      await expect(userService.removeFavoriteWine(testUserId, testWineId)).rejects.toThrow(
        new HttpError('Wine not in favorites', 404),
      );
    });
    it('remove wine from favorites good', async () => {
      const user = {
        favoriteWines: [testWineObjectId],
        save: jest.fn().mockResolvedValue(this),
      };
      mockFindById.mockResolvedValue(user);
      const result = await userService.removeFavoriteWine(testUserId, testWineId);
      expect(user.favoriteWines).toHaveLength(0);
      expect(user.save).toHaveBeenCalled();
      expect(result).toEqual({ message: 'Wine removed from favorites' });
    });
  });
  describe('updateAvatar', () => {
    const testUserId = '65d5ec49e03f7c5558f3d6b1';
    const mockFile = {
      originalname: 'test.png',
      buffer: Buffer.from('test'),
      mimetype: 'image/png',
    } as unknown as Express.Multer.File;
    it('error when user not found', async () => {
      mockFindById.mockResolvedValue(null);
      await expect(userService.updateAvatar(testUserId, mockFile)).rejects.toThrow(
        new HttpError('User not found', 404),
      );
    });
    it('update avatar successfully', async () => {
      const mockSave = jest.fn().mockResolvedValue(true);
      const user = {
        avatarUrl: '',
        save: mockSave,
      };
      mockFindById.mockResolvedValue(user);
      mockUploadFile.mockResolvedValue('http://mock-url.com/avatar.png');
      const result = await userService.updateAvatar(testUserId, mockFile);
      expect(user.avatarUrl).toBe('http://mock-url.com/avatar.png');
      expect(mockSave).toHaveBeenCalled();
      expect(result).toEqual({ avatarUrl: 'http://mock-url.com/avatar.png' });
      expect(mockUploadFile).toHaveBeenCalledWith(mockFile, 'avatars');
    });
  });
  describe('getDefaultAvatar', () => {
    it('should return default avatar string', () => {
      const defaultAvatar = userService.getDefaultAvatar();
      expect(defaultAvatar).toContain('data:image/svg+xml;base64');
    });
  });
});
