jest.mock('@/models/wineModel');
jest.mock('@/models/wineryModel');
jest.mock('@/models/userModel');
jest.mock('@/models/grapeModel');

import Wine from '@/models/wineModel';
import Winery from '@/models/wineryModel';
import User from '@/models/userModel';
import Grape from '@/models/grapeModel';
import { WineService } from '@/services/wineService';

const wineService = new WineService();

const mockWineAggregate = Wine.aggregate as jest.Mock;
const mockWineFindById = Wine.findById as jest.Mock;
const mockWineCreate = Wine.create as jest.Mock;
const mockWineFindByIdAndUpdate = Wine.findByIdAndUpdate as jest.Mock;
const mockWineFindByIdAndDelete = Wine.findByIdAndDelete as jest.Mock;

const mockWineryFind = Winery.find as jest.Mock;
const mockWineryFindById = Winery.findById as jest.Mock;

const mockUserFindById = User.findById as jest.Mock;

const mockGrapeFindOne = Grape.findOne as jest.Mock;
const mockGrapeFindById = Grape.findById as jest.Mock;

const testWines = [
  {
    _id: 'wine-1',
    name: 'Cabernet',
    vintage: 2020,
    color: 'red',
    sweetness: 'dry',
    price: 150,
    averageRating: 4.5,
    winery: 'winery-1',
  },
  {
    _id: 'wine-2',
    name: 'Merlot',
    vintage: 2019,
    color: 'red',
    sweetness: 'dry',
    price: 200,
    averageRating: 4.8,
    winery: 'winery-2',
  },
];

describe('WineService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllWines', () => {
    it('get wines with page', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue(testWines),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 2 }]),
        });

      const result = await wineService.getAllWines({});

      expect(result).toEqual({
        wines: testWines,
        totalCount: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
    });

    it('use custom page and limit', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([testWines[0]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 2 }]),
        });

      const result = await wineService.getAllWines({ page: '2', limit: '1' });

      expect(result.page).toBe(2);
      expect(result.limit).toBe(1);
      expect(result.totalPages).toBe(2);
    });

    it('filter by color', async () => {
      mockWineAggregate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(testWines),
      });
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue(testWines),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 2 }]),
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

      const result = await wineService.getAllWines({ name: 'Cabernet' });

      expect(result.wines).toHaveLength(1);
    });

    it('filter by country', async () => {
      mockWineryFind.mockReturnValue({
        select: jest.fn().mockResolvedValue([{ _id: 'winery-1' }]),
      });

      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([testWines[0]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 1 }]),
        });

      const result = await wineService.getAllWines({ country: 'France' });

      expect(mockWineryFind).toHaveBeenCalledWith({ country: 'France' });
      expect(result.wines).toHaveLength(1);
    });

    it('empty array when no wineries in country', async () => {
      mockWineryFind.mockReturnValue({
        select: jest.fn().mockResolvedValue([]),
      });

      const result = await wineService.getAllWines({ country: 'Unknown' });

      expect(result.wines).toEqual([]);
      expect(result.totalCount).toBe(0);
    });

    it('filter by grape', async () => {
      mockGrapeFindOne.mockReturnValue({
        select: jest.fn().mockResolvedValue({ _id: 'grape-1' }),
      });

      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([testWines[0]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 1 }]),
        });

      const result = await wineService.getAllWines({ grape: 'Cabernet' });

      expect(mockGrapeFindOne).toHaveBeenCalledWith({ name: 'Cabernet' });
      expect(result.wines).toHaveLength(1);
    });

    it('empty when grape not found', async () => {
      mockGrapeFindOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const result = await wineService.getAllWines({ grape: 'BadGrape' });

      expect(result.wines).toEqual([]);
      expect(result.totalCount).toBe(0);
    });

    it('filter by minRating', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([testWines[1]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 1 }]),
        });

      const result = await wineService.getAllWines({ minRating: '4.7' });

      expect(result.wines).toHaveLength(1);
    });

    it('filter by maxPrice', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([testWines[0]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 1 }]),
        });

      const result = await wineService.getAllWines({ maxPrice: '160' });

      expect(result.wines).toHaveLength(1);
    });

    it('filter by vintage', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([testWines[0]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 1 }]),
        });

      const result = await wineService.getAllWines({ vintage: '2020' });

      expect(result.wines).toHaveLength(1);
    });

    it('filter by wineryId', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([testWines[0]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 1 }]),
        });

      const result = await wineService.getAllWines({ wineryId: 'winery-1' });

      expect(result.wines).toHaveLength(1);
    });

    it('filter by sweetness', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue(testWines),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 2 }]),
        });

      const result = await wineService.getAllWines({ sweetness: 'dry' });

      expect(result.wines).toHaveLength(2);
    });
  });

  describe('getWineById', () => {
    it('get wine by id when exist', async () => {
      const testWine = { _id: 'wine-1', name: 'Test Wine' };

      const createMockQuery = () => ({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(testWine),
          }),
        }),
        exec: jest.fn().mockResolvedValue(testWine),
      });

      mockWineFindById.mockReturnValue(createMockQuery());

      const result = await wineService.getWineById('wine-1');

      expect(result).toEqual(testWine);
      expect(mockWineFindById).toHaveBeenCalledWith('wine-1');
    });

    it('return null when wine not found', async () => {
      const createMockQuery = () => ({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(null),
          }),
        }),
        exec: jest.fn().mockResolvedValue(null),
      });

      mockWineFindById.mockReturnValue(createMockQuery());

      const result = await wineService.getWineById('bad-id');

      expect(result).toBeNull();
    });
  });

  describe('createWine', () => {
    const testWineData = {
      name: 'New Wine',
      winery: 'winery-1',
      vintage: 2023,
      grape: 'grape-1',
      color: 'red' as const,
      sweetness: 'dry' as const,
      price: 100,
      description: '',
      tastingNotes: [],
      imageUrl: '',
      averageRating: 0,
    } as unknown as import('@/models/wineModel').IWine;

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

    it('error when user not found', async () => {
      mockUserFindById.mockResolvedValue(null);

      await expect(wineService.createWine(testWineData, 'user-1')).rejects.toThrow(
        'User not found.',
      );
    });

    it('error when user not WINERY_OWNER or ADMIN', async () => {
      mockUserFindById.mockResolvedValue({ _id: 'user-1', role: 'USER' });

      await expect(wineService.createWine(testWineData, 'user-1')).rejects.toThrow(
        'Only winery owners can create wines.',
      );
    });

    it('error when winery not found', async () => {
      mockUserFindById.mockResolvedValue(testUser);
      mockWineryFindById.mockResolvedValue(null);

      await expect(wineService.createWine(testWineData, 'user-1')).rejects.toThrow(
        'Winery not found.',
      );
    });

    it('error when user not owner of winery', async () => {
      mockUserFindById.mockResolvedValue(testUser);
      mockWineryFindById.mockResolvedValue({ _id: 'winery-1', owner: 'other-user' });

      await expect(wineService.createWine(testWineData, 'user-1')).rejects.toThrow(
        'You are not owner of this winery.',
      );
    });

    it('error when grape not found', async () => {
      mockUserFindById.mockResolvedValue(testUser);
      mockWineryFindById.mockResolvedValue(testWinery);
      mockGrapeFindById.mockResolvedValue(null);

      await expect(wineService.createWine(testWineData, 'user-1')).rejects.toThrow(
        'Grape not found.',
      );
    });

    it('create wine good', async () => {
      mockUserFindById.mockResolvedValue(testUser);
      mockWineryFindById.mockResolvedValue(testWinery);
      mockGrapeFindById.mockResolvedValue(testGrape);
      mockWineCreate.mockResolvedValue({ ...testWineData, _id: 'new-wine-id' });

      const result = await wineService.createWine(testWineData, 'user-1');

      expect(mockWineCreate).toHaveBeenCalledWith(testWineData);
      expect(result).toEqual({ ...testWineData, _id: 'new-wine-id' });
    });

    it('admin can create wine for any winery', async () => {
      const adminUser = { _id: 'admin-1', role: 'ADMIN' };

      mockUserFindById.mockResolvedValue(adminUser);
      mockWineryFindById.mockResolvedValue(testWinery);
      mockGrapeFindById.mockResolvedValue(testGrape);
      mockWineCreate.mockResolvedValue({ ...testWineData, _id: 'new-wine-id' });

      const result = await wineService.createWine(testWineData, 'admin-1');

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
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      const result = await wineService.updateWine('wine-1', { name: 'New' }, 'user-1', 'ADMIN');

      expect(result).toBeNull();
    });

    it('error when winery not found', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue({ ...testWine, winery: null }),
        }),
      });

      await expect(
        wineService.updateWine('wine-1', { name: 'New' }, 'user-1', 'ADMIN'),
      ).rejects.toThrow('Winery not found.');
    });

    it('error when user not authorized', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(testWine),
        }),
      });

      await expect(
        wineService.updateWine('wine-1', { name: 'New' }, 'other-user', 'USER'),
      ).rejects.toThrow('You cant update this wine.');
    });

    it('error when grape not found', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(testWine),
        }),
      });

      mockGrapeFindById.mockResolvedValue(null);

      const grapeId = 'bad-grape' as unknown as import('mongoose').Types.ObjectId;

      await expect(
        wineService.updateWine('wine-1', { grape: grapeId }, 'user-1', 'ADMIN'),
      ).rejects.toThrow('Grape not found.');
    });

    it('update wine good', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(testWine),
        }),
      });

      const updatedWine = { ...testWine, name: 'New Name' };
      mockWineFindByIdAndUpdate.mockResolvedValue(updatedWine);

      const result = await wineService.updateWine('wine-1', { name: 'New Name' }, 'user-1', 'ADMIN');

      expect(result).toEqual(updatedWine);
    });

    it('admin can update any wine', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(testWine),
        }),
      });

      const updatedWine = { ...testWine, name: 'Updated' };
      mockWineFindByIdAndUpdate.mockResolvedValue(updatedWine);

      const result = await wineService.updateWine(
        'wine-1',
        { name: 'Updated' },
        'admin-user',
        'ADMIN',
      );

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

    it('error when wine not found', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      await expect(wineService.deleteWine('wine-1', 'user-1', 'ADMIN')).rejects.toThrow(
        'Wine not found.',
      );
    });

    it('error when winery not found', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue({ ...testWine, winery: null }),
        }),
      });

      await expect(wineService.deleteWine('wine-1', 'user-1', 'ADMIN')).rejects.toThrow(
        'Winery not found.',
      );
    });

    it('error when user not authorized', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(testWine),
        }),
      });

      await expect(wineService.deleteWine('wine-1', 'other-user', 'USER')).rejects.toThrow(
        'You cant delete this wine.',
      );
    });

    it('delete wine good', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(testWine),
        }),
      });

      mockWineFindByIdAndDelete.mockResolvedValue(true);

      await expect(wineService.deleteWine('wine-1', 'user-1', 'ADMIN')).resolves.not.toThrow();
      expect(mockWineFindByIdAndDelete).toHaveBeenCalledWith('wine-1');
    });

    it('admin can delete any wine', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(testWine),
        }),
      });

      mockWineFindByIdAndDelete.mockResolvedValue(true);

      await expect(wineService.deleteWine('wine-1', 'any-user', 'ADMIN')).resolves.not.toThrow();
    });

    it('owner can delete own wine', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(testWine),
        }),
      });

      mockWineFindByIdAndDelete.mockResolvedValue(true);

      await expect(wineService.deleteWine('wine-1', 'user-1', 'WINERY_OWNER')).resolves.not.toThrow();
    });
  });
});
