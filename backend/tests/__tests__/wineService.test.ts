jest.mock('@/models/wineModel');
jest.mock('@/models/wineryModel');
jest.mock('@/models/userModel');
jest.mock('@/models/grapeModel');
jest.mock('@/services/firebase', () => ({
  uploadFile: jest.fn().mockResolvedValue('http://mock-url.com/file.png'),
  deleteFile: jest.fn().mockResolvedValue(undefined),
}));
import Wine from '@/models/wineModel';
import Winery from '@/models/wineryModel';
import User from '@/models/userModel';
import Grape from '@/models/grapeModel';
import { WineService } from '@/services/wineService';
import HttpError from '@/utils/HttpError';
import { uploadFile, deleteFile } from '@/services/firebase';

const wineService = new WineService();
const mockWineAggregate = Wine.aggregate as jest.Mock;
const mockWineFindById = Wine.findById as jest.Mock;
const mockWineCreate = Wine.create as jest.Mock;
const mockWineFindByIdAndUpdate = Wine.findByIdAndUpdate as jest.Mock;
const mockWineFindByIdAndDelete = Wine.findByIdAndDelete as jest.Mock;
const mockWineryFindById = Winery.findById as jest.Mock;
const mockUserFindById = User.findById as jest.Mock;
const mockGrapeFindById = Grape.findById as jest.Mock;

describe('WineService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testWines = [
    { _id: '1', name: 'Wine 1', averageRating: 4.5, createdAt: new Date('2023-01-01') },
    { _id: '2', name: 'Wine 2', averageRating: 4.0, createdAt: new Date('2023-01-02') },
  ];

  describe('getAllWines', () => {
    it('get wines with page', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue(testWines),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 2 }]),
        });

      const result = await wineService.getAllWines({ page: '1' });
      expect(result.wines).toHaveLength(2);
      expect(result.page).toBe(1);
    });

    it('use custom page and limit', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue(testWines),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 2 }]),
        });

      const result = await wineService.getAllWines({ page: '2', limit: '5' });
      expect(result.page).toBe(2);
      expect(result.limit).toBe(5);
    });

    it('filter by color', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([testWines[0]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 1 }]),
        });

      await wineService.getAllWines({ color: 'red' });
      expect(mockWineAggregate).toHaveBeenCalled();
    });

    it('filter by name', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([testWines[0]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 1 }]),
        });

      await wineService.getAllWines({ name: 'Wine 1' });
      expect(mockWineAggregate).toHaveBeenCalled();
    });
  });

  describe('getWineById', () => {
    it('return wine when found', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(testWines[0]),
      });

      const result = await wineService.getWineById('1');
      expect(result).toEqual(testWines[0]);
    });

    it('error when not found', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(wineService.getWineById('999')).rejects.toThrow('Wine not found.');
    });
  });

  describe('createWine', () => {
    const testWineData = {
      name: 'New Wine',
      winery: 'winery-1',
      grape: 'grape-1',
    } as any;
    const testUser = {
      _id: 'user-1',
      role: 'WINERY_OWNER',
    };
    const testWinery = {
      _id: 'winery-1',
      owner: 'user-1',
    };
    const testGrape = {
      _id: 'grape-1',
    };

    it('error when user not WINERY_OWNER or ADMIN', async () => {
      mockUserFindById.mockResolvedValue({ _id: 'user-1', role: 'USER' });
      await expect(wineService.createWine(testWineData, 'user-1', 'USER')).rejects.toThrow(
        'Only winery owners can create wines.',
      );
    });

    it('error when winery not found', async () => {
      mockUserFindById.mockResolvedValue(testUser);
      mockWineryFindById.mockResolvedValue(null);
      await expect(wineService.createWine(testWineData, 'user-1', 'WINERY_OWNER')).rejects.toThrow(
        'Winery not found.',
      );
    });

    it('error when user not owner of winery', async () => {
      mockUserFindById.mockResolvedValue(testUser);
      mockWineryFindById.mockResolvedValue({ _id: 'winery-1', owner: 'other-user' });
      await expect(wineService.createWine(testWineData, 'user-1', 'WINERY_OWNER')).rejects.toThrow(
        'You are not owner of this winery.',
      );
    });

    it('error when grape not found', async () => {
      mockUserFindById.mockResolvedValue(testUser);
      mockWineryFindById.mockResolvedValue(testWinery);
      mockGrapeFindById.mockResolvedValue(null);
      await expect(wineService.createWine(testWineData, 'user-1', 'WINERY_OWNER')).rejects.toThrow(
        'Grape not found.',
      );
    });

    it('create wine good', async () => {
      mockUserFindById.mockResolvedValue(testUser);
      mockWineryFindById.mockResolvedValue(testWinery);
      mockGrapeFindById.mockResolvedValue(testGrape);
      mockWineCreate.mockResolvedValue({ ...testWineData, _id: 'new-wine-id' });
      const result = await wineService.createWine(testWineData, 'user-1', 'WINERY_OWNER');
      expect(mockWineCreate).toHaveBeenCalledWith(testWineData);
      expect(result).toEqual({ ...testWineData, _id: 'new-wine-id' });
    });

    it('admin can create wine for any winery', async () => {
      const adminUser = { _id: 'admin-1', role: 'ADMIN' };
      mockUserFindById.mockResolvedValue(adminUser);
      mockWineryFindById.mockResolvedValue(testWinery);
      mockGrapeFindById.mockResolvedValue(testGrape);
      mockWineCreate.mockResolvedValue({ ...testWineData, _id: 'new-wine-id' });
      const result = await wineService.createWine(testWineData, 'admin-1', 'ADMIN');
      expect(mockWineCreate).toHaveBeenCalled();
      expect(result).toBeDefined();
    });
  });

  describe('updateWine', () => {
    const testWine = {
      _id: 'wine-1',
      name: 'Old Name',
      winery: {
        _id: 'winery-1',
        owner: 'user-1',
      },
    };

    it('return null when wine not found', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      });
      const result = await wineService.updateWine('wine-1', { name: 'New' }, 'user-1', 'ADMIN');
      expect(result).toBeNull();
    });

    it('error when winery not found for non-admin', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue({ ...testWine, winery: null }),
      });
      await expect(
        wineService.updateWine('wine-1', { name: 'New' }, 'user-1', 'WINERY_OWNER'),
      ).rejects.toThrow('Winery not found.');
    });

    it('admin can update even if winery not found', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue({ ...testWine, winery: null }),
      });
      mockWineFindByIdAndUpdate.mockResolvedValue({ ...testWine, name: 'New' });
      const result = await wineService.updateWine('wine-1', { name: 'New' }, 'admin-1', 'ADMIN');
      expect(result).toBeDefined();
    });

    it('error when user not authorized', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(testWine),
      });
      await expect(
        wineService.updateWine('wine-1', { name: 'New' }, 'other-user', 'USER'),
      ).rejects.toThrow('You cant update this wine.');
    });

    it('update wine good', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(testWine),
      });
      const updatedWine = { ...testWine, name: 'New Name' };
      mockWineFindByIdAndUpdate.mockResolvedValue(updatedWine);
      const result = await wineService.updateWine('wine-1', { name: 'New Name' }, 'user-1', 'ADMIN');
      expect(result).toEqual(updatedWine);
    });
  });

  describe('deleteWine', () => {
    const testWine = {
      _id: 'wine-1',
      winery: {
        _id: 'winery-1',
        owner: 'user-1',
      },
    };

    it('error when winery not found for non-admin', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue({ ...testWine, winery: null }),
      });
      await expect(wineService.deleteWine('wine-1', 'user-1', 'WINERY_OWNER')).rejects.toThrow(
        'Winery not found.',
      );
    });

    it('delete wine good', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue({
          ...testWine,
          imageUrl: 'http://mock-url.com/image.png',
        }),
      });
      mockWineFindByIdAndDelete.mockResolvedValue(true);
      await expect(wineService.deleteWine('wine-1', 'user-1', 'ADMIN')).resolves.not.toThrow();
      expect(mockWineFindByIdAndDelete).toHaveBeenCalledWith('wine-1');
      expect(deleteFile).toHaveBeenCalledWith('http://mock-url.com/image.png');
    });

    it('admin can delete any wine', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(testWine),
      });
      mockWineFindByIdAndDelete.mockResolvedValue(true);
      await expect(wineService.deleteWine('wine-1', 'any-user', 'ADMIN')).resolves.not.toThrow();
    });
  });
});
