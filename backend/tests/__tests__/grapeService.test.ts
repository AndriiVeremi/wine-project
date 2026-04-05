jest.mock('@/models/grapeModel');
jest.mock('@/models/wineryModel');
jest.mock('@/services/firebase', () => ({
  uploadFile: jest.fn().mockResolvedValue('http://mock-url.com/new-file.png'),
  deleteFile: jest.fn().mockResolvedValue(undefined),
}));

import Grape from '@/models/grapeModel';
import Winery from '@/models/wineryModel';
import grapeService from '@/services/grapeService';
import { uploadFile, deleteFile } from '@/services/firebase';

const mockGrapeFindById = Grape.findById as jest.Mock;
const mockGrapeFindByIdAndUpdate = Grape.findByIdAndUpdate as jest.Mock;
const mockGrapeFindByIdAndDelete = Grape.findByIdAndDelete as jest.Mock;
const mockWineryFindById = Winery.findById as jest.Mock;

describe('GrapeService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockGrape = {
    _id: 'grape-1',
    name: 'Merlot',
    imageUrls: ['http://mock-url.com/old-file.png'],
    winery: 'winery-1',
  };

  const mockWinery = {
    _id: 'winery-1',
    owner: 'user-1',
  };

  describe('updateGrape', () => {
    it('should NOT delete old images when new files are uploaded IF they are included in data.imageUrls', async () => {
      mockGrapeFindById.mockResolvedValue(mockGrape);
      mockWineryFindById.mockResolvedValue(mockWinery);
      mockGrapeFindByIdAndUpdate.mockResolvedValue({ 
        ...mockGrape, 
        imageUrls: ['http://mock-url.com/old-file.png', 'http://mock-url.com/new-file.png'] 
      });

      const files = [{ originalname: 'new.png', buffer: Buffer.from(''), mimetype: 'image/png' }] as Express.Multer.File[];
      
      await grapeService.updateGrape('grape-1', { imageUrls: ['http://mock-url.com/old-file.png'] }, 'user-1', 'USER', files);

      expect(deleteFile).not.toHaveBeenCalled();
      expect(uploadFile).toHaveBeenCalled();
    });

    it('should delete images not in keep-list', async () => {
      const grapeWithTwoImages = {
        ...mockGrape,
        imageUrls: ['url-1', 'url-2']
      };
      mockGrapeFindById.mockResolvedValue(grapeWithTwoImages);
      mockWineryFindById.mockResolvedValue(mockWinery);
      
      await grapeService.updateGrape('grape-1', { imageUrls: ['url-1'] }, 'user-1', 'USER');

      expect(deleteFile).toHaveBeenCalledWith('url-2');
      expect(deleteFile).not.toHaveBeenCalledWith('url-1');
    });
  });

  describe('deleteGrape', () => {
    it('should delete all images when grape is deleted', async () => {
      mockGrapeFindById.mockResolvedValue(mockGrape);
      mockWineryFindById.mockResolvedValue(mockWinery);

      await grapeService.deleteGrape('grape-1', 'user-1', 'USER');

      expect(deleteFile).toHaveBeenCalledWith('http://mock-url.com/old-file.png');
      expect(mockGrapeFindByIdAndDelete).toHaveBeenCalledWith('grape-1');
    });
  });

  describe('updateGrapeImages', () => {
    it('should delete images that exceed the limit of 5', async () => {
      const grapeWith4Images = {
        ...mockGrape,
        imageUrls: ['url-1', 'url-2', 'url-3', 'url-4']
      };
      mockGrapeFindById.mockResolvedValue(grapeWith4Images);
      
      const newFiles = [
        { originalname: '5.png' },
        { originalname: '6.png' }
      ] as Express.Multer.File[];

      (uploadFile as jest.Mock)
        .mockResolvedValueOnce('url-5')
        .mockResolvedValueOnce('url-6');

      await grapeService.updateGrapeImages('grape-1', newFiles);

      expect(deleteFile).toHaveBeenCalledWith('url-6');
    });
  });
});
