jest.mock('@/models/wineryModel');
jest.mock('@/models/userModel');
import * as wineryService from '@/services/wineryService';
import HttpError from '@/utils/HttpError';
import Winery from '@/models/wineryModel';
import User, { IUser } from '@/models/userModel';
import { Types } from 'mongoose';

const mockWineryFindOne = Winery.findOne as jest.Mock;
const mockWineryFindById = Winery.findById as jest.Mock;
const mockWineryFind = Winery.find as jest.Mock;
const mockWineryFindByIdAndDelete = Winery.findByIdAndDelete as jest.Mock;
const mockWineryCountDocuments = Winery.countDocuments as jest.Mock;
const mockUserFindByIdAndUpdate = User.findByIdAndUpdate as jest.Mock;
const mockUserFindById = User.findById as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('wineryService', () => {
  describe('createWinery', () => {
    const testWineryData = {
      name: 'Test Winery',
      country: new Types.ObjectId(),
      region: new Types.ObjectId(),
      contactEmail: 'test@winery.com',
      contactPhone: '+1234567890',
    };

    it('error when winery name already exist', async () => {
      mockWineryFindOne.mockResolvedValue({ _id: 'existing-id', name: 'Test Winery' });
      await expect(wineryService.createWinery('user-id', testWineryData as any)).rejects.toThrow(
        new HttpError('Winery with this name already exists', 400),
      );
    });

    it('create new winery good', async () => {
      mockWineryFindOne.mockResolvedValue(null);
      mockUserFindById.mockResolvedValue({ _id: 'user-id' });
      const mockSave = jest.fn().mockResolvedValue({ ...testWineryData, _id: 'new-winery-id', owner: 'user-id' });
      
      (Winery as unknown as jest.Mock).mockImplementation(() => ({
        ...testWineryData,
        owner: 'user-id',
        _id: 'new-winery-id',
        save: mockSave,
      }));

      const result = await wineryService.createWinery('user-id', testWineryData as any);
      expect(mockWineryFindOne).toHaveBeenCalledWith({ name: 'Test Winery' });
      expect(mockUserFindByIdAndUpdate).toHaveBeenCalledWith(
        'user-id', 
        { winery: expect.anything() }
      );
      expect(result).toHaveProperty('_id', 'new-winery-id');
    });
  });

  describe('getAllWineries', () => {
    const testWineries = [
      { _id: '1', name: 'VIP Winery', isVip: true },
      { _id: '2', name: 'Simple Winery', isVip: false },
    ];

    const mockFullChain = (result: unknown) => ({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      then: jest.fn().mockImplementation((callback) => Promise.resolve(result).then(callback)),
    });

    it('get all wineries with page', async () => {
      mockWineryFind.mockReturnValue(mockFullChain(testWineries));
      mockWineryCountDocuments.mockResolvedValue(2);
      const result = await wineryService.getAllWineries({});
      expect(result.wineries).toHaveLength(2);
      expect(result.totalCount).toBe(2);
    });

    it('use custom page and limit', async () => {
      mockWineryFind.mockReturnValue(mockFullChain([testWineries[1]]));
      mockWineryCountDocuments.mockResolvedValue(12);
      const result = await wineryService.getAllWineries({ page: 2, limit: 5 });
      expect(result.page).toBe(2);
      expect(result.limit).toBe(5);
      expect(result.totalPages).toBe(3);
    });
  });

  describe('getWineryById', () => {
    it('get winery by id when exist', async () => {
      const testWinery = { _id: 'winery-1', name: 'Test Winery' };
      mockWineryFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(testWinery),
        }),
      });
      const result = await wineryService.getWineryById('winery-1');
      expect(result).toEqual(testWinery);
    });

    it('error when winery not found', async () => {
      mockWineryFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(null),
        }),
      });
      await expect(wineryService.getWineryById('bad-id')).rejects.toThrow(
        new HttpError('Winery not found', 404),
      );
    });
  });

  describe('updateWinery', () => {
    it('error when winery not found for update', async () => {
      const mockUpdate = Winery.findByIdAndUpdate as jest.Mock;
      mockUpdate.mockResolvedValue(null);
      await expect(wineryService.updateWinery('winery-1', { name: 'New Name' })).rejects.toThrow(
        new HttpError('Winery not found', 404),
      );
    });

    it('update winery good', async () => {
      const testWinery = {
        _id: 'winery-1',
        name: 'New Name',
      };
      const mockUpdate = Winery.findByIdAndUpdate as jest.Mock;
      mockUpdate.mockResolvedValue(testWinery);
      const result = await wineryService.updateWinery('winery-1', { name: 'New Name' });
      expect(result).toEqual(testWinery);
    });
  });

  describe('deleteWineryById', () => {
    it('error when winery not found for delete', async () => {
      mockWineryFindById.mockResolvedValue(null);
      const testUser = { _id: '507f1f77bcf86cd799439010', role: 'WINERY_OWNER' } as unknown as IUser;
      await expect(wineryService.deleteWineryById('507f1f77bcf86cd799439011', testUser)).rejects.toThrow(
        new HttpError('Winery not found', 404),
      );
    });

    it('error when user not owner', async () => {
      const testWinery = { _id: '1', owner: '507f1f77bcf86cd799439010' };
      mockWineryFindById.mockResolvedValue(testWinery);
      const otherUser = { _id: '507f1f77bcf86cd799439012', role: 'USER' } as unknown as IUser;
      await expect(wineryService.deleteWineryById('1', otherUser)).rejects.toThrow(
        new HttpError('You do not have permission to delete this winery.', 403),
      );
    });

    it('delete by owner good', async () => {
      const testWinery = { _id: '1', owner: '507f1f77bcf86cd799439010' };
      mockWineryFindById.mockResolvedValue(testWinery);
      mockWineryFindByIdAndDelete.mockResolvedValue(true);
      mockUserFindByIdAndUpdate.mockResolvedValue(true);
      const testUser = { _id: '507f1f77bcf86cd799439010', role: 'WINERY_OWNER' } as unknown as IUser;
      await wineryService.deleteWineryById('1', testUser);
      expect(mockWineryFindByIdAndDelete).toHaveBeenCalledWith('1');
    });

    it('delete by admin good', async () => {
      const testWinery = { _id: '1', owner: '507f1f77bcf86cd799439010' };
      mockWineryFindById.mockResolvedValue(testWinery);
      mockWineryFindByIdAndDelete.mockResolvedValue(true);
      const adminUser = { _id: '507f1f77bcf86cd799439013', role: 'ADMIN' } as unknown as IUser;
      await wineryService.deleteWineryById('1', adminUser);
      expect(mockWineryFindByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });
});
