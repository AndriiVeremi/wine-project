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

const mockWines = [
  {
    _id: 'wine-1',
    name: 'Cabernet Sauvignon',
    vintage: 2020,
    color: 'red',
    sweetness: 'dry',
    price: 150,
    averageRating: 4.5,
    winery: 'winery-1',
  },
  {
    _id: 'wine-2',
    name: 'Merlot Reserve',
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
    it('should return wines with pagination metadata', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue(mockWines),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 2 }]),
        });

      const result = await wineService.getAllWines({});

      expect(result).toEqual({
        wines: mockWines,
        totalCount: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
    });

    it('should use custom page and limit', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([mockWines[0]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 2 }]),
        });

      const result = await wineService.getAllWines({ page: '2', limit: '1' });

      expect(result.page).toBe(2);
      expect(result.limit).toBe(1);
      expect(result.totalPages).toBe(2);
    });

    it('should filter by color', async () => {
      mockWineAggregate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockWines),
      });
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue(mockWines),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 2 }]),
        });

      await wineService.getAllWines({ color: 'red' });

      expect(mockWineAggregate).toHaveBeenCalled();
    });

    it('should filter by name with regex', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([mockWines[0]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 1 }]),
        });

      const result = await wineService.getAllWines({ name: 'Cabernet' });

      expect(result.wines).toHaveLength(1);
    });

    it('should filter by country', async () => {
      mockWineryFind.mockReturnValue({
        select: jest.fn().mockResolvedValue([{ _id: 'winery-1' }]),
      });

      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([mockWines[0]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 1 }]),
        });

      const result = await wineService.getAllWines({ country: 'France' });

      expect(mockWineryFind).toHaveBeenCalledWith({ country: 'France' });
      expect(result.wines).toHaveLength(1);
    });

    it('should return empty array if no wineries found for country', async () => {
      mockWineryFind.mockReturnValue({
        select: jest.fn().mockResolvedValue([]),
      });

      const result = await wineService.getAllWines({ country: 'Unknown' });

      expect(result.wines).toEqual([]);
      expect(result.totalCount).toBe(0);
    });

    it('should filter by grape variety', async () => {
      mockGrapeFindOne.mockReturnValue({
        select: jest.fn().mockResolvedValue({ _id: 'grape-1' }),
      });

      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([mockWines[0]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 1 }]),
        });

      const result = await wineService.getAllWines({ grape: 'Cabernet' });

      expect(mockGrapeFindOne).toHaveBeenCalledWith({ name: 'Cabernet' });
      expect(result.wines).toHaveLength(1);
    });

    it('should return empty if grape not found', async () => {
      mockGrapeFindOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const result = await wineService.getAllWines({ grape: 'UnknownGrape' });

      expect(result.wines).toEqual([]);
      expect(result.totalCount).toBe(0);
    });

    it('should filter by minRating', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([mockWines[1]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 1 }]),
        });

      const result = await wineService.getAllWines({ minRating: '4.7' });

      expect(result.wines).toHaveLength(1);
    });

    it('should filter by maxPrice', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([mockWines[0]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 1 }]),
        });

      const result = await wineService.getAllWines({ maxPrice: '160' });

      expect(result.wines).toHaveLength(1);
    });

    it('should filter by vintage', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([mockWines[0]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 1 }]),
        });

      const result = await wineService.getAllWines({ vintage: '2020' });

      expect(result.wines).toHaveLength(1);
    });

    it('should filter by wineryId', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([mockWines[0]]),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 1 }]),
        });

      const result = await wineService.getAllWines({ wineryId: 'winery-1' });

      expect(result.wines).toHaveLength(1);
    });

    it('should filter by sweetness', async () => {
      mockWineAggregate
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue(mockWines),
        })
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue([{ total: 2 }]),
        });

      const result = await wineService.getAllWines({ sweetness: 'dry' });

      expect(result.wines).toHaveLength(2);
    });
  });

  describe('getWineById', () => {
    it('should return wine by id', async () => {
      const mockWine = { _id: 'wine-1', name: 'Test Wine' };

      const createMockQuery = () => ({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockWine),
          }),
        }),
        exec: jest.fn().mockResolvedValue(mockWine),
      });

      mockWineFindById.mockReturnValue(createMockQuery());

      const result = await wineService.getWineById('wine-1');

      expect(result).toEqual(mockWine);
      expect(mockWineFindById).toHaveBeenCalledWith('wine-1');
    });

    it('should return null if wine not found', async () => {
      const createMockQuery = () => ({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(null),
          }),
        }),
        exec: jest.fn().mockResolvedValue(null),
      });

      mockWineFindById.mockReturnValue(createMockQuery());

      const result = await wineService.getWineById('nonexistent-id');

      expect(result).toBeNull();
    });
  });

  describe('createWine', () => {
    const mockWineData = {
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

    const mockUser = {
      _id: 'user-1',
      role: 'WINERY_OWNER',
    };

    const mockWinery = {
      _id: 'winery-1',
      owner: 'user-1',
    };

    const mockGrape = {
      _id: 'grape-1',
    };

    it('should throw 404 if user not found', async () => {
      mockUserFindById.mockResolvedValue(null);

      await expect(wineService.createWine(mockWineData, 'user-1')).rejects.toThrow(
        'User not found.',
      );
    });

    it('should throw 403 if user is not WINERY_OWNER or ADMIN', async () => {
      mockUserFindById.mockResolvedValue({ _id: 'user-1', role: 'USER' });

      await expect(wineService.createWine(mockWineData, 'user-1')).rejects.toThrow(
        'Only winery owners or administrators can create wines.',
      );
    });

    it('should throw 404 if winery not found', async () => {
      mockUserFindById.mockResolvedValue(mockUser);
      mockWineryFindById.mockResolvedValue(null);

      await expect(wineService.createWine(mockWineData, 'user-1')).rejects.toThrow(
        'Winery not found.',
      );
    });

    it('should throw 403 if user is WINERY_OWNER but not owner of winery', async () => {
      mockUserFindById.mockResolvedValue(mockUser);
      mockWineryFindById.mockResolvedValue({ _id: 'winery-1', owner: 'other-user' });

      await expect(wineService.createWine(mockWineData, 'user-1')).rejects.toThrow(
        'You are not the owner of this winery.',
      );
    });

    it('should throw 404 if grape not found', async () => {
      mockUserFindById.mockResolvedValue(mockUser);
      mockWineryFindById.mockResolvedValue(mockWinery);
      mockGrapeFindById.mockResolvedValue(null);

      await expect(wineService.createWine(mockWineData, 'user-1')).rejects.toThrow(
        'Grape variety not found.',
      );
    });

    it('should create wine successfully', async () => {
      mockUserFindById.mockResolvedValue(mockUser);
      mockWineryFindById.mockResolvedValue(mockWinery);
      mockGrapeFindById.mockResolvedValue(mockGrape);
      mockWineCreate.mockResolvedValue({ ...mockWineData, _id: 'new-wine-id' });

      const result = await wineService.createWine(mockWineData, 'user-1');

      expect(mockWineCreate).toHaveBeenCalledWith(mockWineData);
      expect(result).toEqual({ ...mockWineData, _id: 'new-wine-id' });
    });

    it('should allow ADMIN to create wine for any winery', async () => {
      const adminUser = { _id: 'admin-1', role: 'ADMIN' };

      mockUserFindById.mockResolvedValue(adminUser);
      mockWineryFindById.mockResolvedValue(mockWinery);
      mockGrapeFindById.mockResolvedValue(mockGrape);
      mockWineCreate.mockResolvedValue({ ...mockWineData, _id: 'new-wine-id' });

      const result = await wineService.createWine(mockWineData, 'admin-1');

      expect(mockWineCreate).toHaveBeenCalled();
      expect(result).toBeDefined();
    });
  });

  describe('updateWine', () => {
    const mockWine = {
      _id: 'wine-1',
      name: 'Old Name',
      winery: {
        _id: 'winery-1',
        owner: 'user-1',
      },
    };

    it('should return null if wine not found', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      const result = await wineService.updateWine('wine-1', { name: 'New' }, 'user-1', 'ADMIN');

      expect(result).toBeNull();
    });

    it('should throw 404 if winery not found', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue({ ...mockWine, winery: null }),
        }),
      });

      await expect(
        wineService.updateWine('wine-1', { name: 'New' }, 'user-1', 'ADMIN'),
      ).rejects.toThrow('Winery associated with this wine not found.');
    });

    it('should throw 403 if user is not authorized', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockWine),
        }),
      });

      await expect(
        wineService.updateWine('wine-1', { name: 'New' }, 'other-user', 'USER'),
      ).rejects.toThrow('You are not authorized to update this wine.');
    });

    it('should throw 404 if grape not found', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockWine),
        }),
      });

      mockGrapeFindById.mockResolvedValue(null);

      const grapeId = 'invalid-grape' as unknown as import('mongoose').Types.ObjectId;

      await expect(
        wineService.updateWine('wine-1', { grape: grapeId }, 'user-1', 'ADMIN'),
      ).rejects.toThrow('Grape variety not found.');
    });

    it('should update wine successfully', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockWine),
        }),
      });

      const updatedWine = { ...mockWine, name: 'New Name' };
      mockWineFindByIdAndUpdate.mockResolvedValue(updatedWine);

      const result = await wineService.updateWine('wine-1', { name: 'New Name' }, 'user-1', 'ADMIN');

      expect(result).toEqual(updatedWine);
    });

    it('should allow ADMIN to update any wine', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockWine),
        }),
      });

      const updatedWine = { ...mockWine, name: 'Updated by Admin' };
      mockWineFindByIdAndUpdate.mockResolvedValue(updatedWine);

      const result = await wineService.updateWine(
        'wine-1',
        { name: 'Updated by Admin' },
        'admin-user',
        'ADMIN',
      );

      expect(result).toEqual(updatedWine);
    });
  });

  describe('deleteWine', () => {
    const mockWine = {
      _id: 'wine-1',
      winery: {
        _id: 'winery-1',
        owner: 'user-1',
      },
    };

    it('should throw 404 if wine not found', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      await expect(wineService.deleteWine('wine-1', 'user-1', 'ADMIN')).rejects.toThrow(
        'Wine not found.',
      );
    });

    it('should throw 404 if winery not found', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue({ ...mockWine, winery: null }),
        }),
      });

      await expect(wineService.deleteWine('wine-1', 'user-1', 'ADMIN')).rejects.toThrow(
        'Winery associated with this wine not found.',
      );
    });

    it('should throw 403 if user is not authorized', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockWine),
        }),
      });

      await expect(wineService.deleteWine('wine-1', 'other-user', 'USER')).rejects.toThrow(
        'You are not authorized to delete this wine.',
      );
    });

    it('should delete wine successfully', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockWine),
        }),
      });

      mockWineFindByIdAndDelete.mockResolvedValue(true);

      await expect(wineService.deleteWine('wine-1', 'user-1', 'ADMIN')).resolves.not.toThrow();
      expect(mockWineFindByIdAndDelete).toHaveBeenCalledWith('wine-1');
    });

    it('should allow ADMIN to delete any wine', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockWine),
        }),
      });

      mockWineFindByIdAndDelete.mockResolvedValue(true);

      await expect(wineService.deleteWine('wine-1', 'any-user', 'ADMIN')).resolves.not.toThrow();
    });

    it('should allow WINERY_OWNER to delete their own wine', async () => {
      mockWineFindById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockWine),
        }),
      });

      mockWineFindByIdAndDelete.mockResolvedValue(true);

      await expect(wineService.deleteWine('wine-1', 'user-1', 'WINERY_OWNER')).resolves.not.toThrow();
    });
  });
});
