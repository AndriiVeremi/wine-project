import Grape, { IGrape } from '@/models/grapeModel';
import { uploadFile } from '@/services/firebase';

interface GrapeQuery {
  search?: string;
  type?: string;
  region?: string;
  body?: string;
  acidity?: string;
  page?: string;
  limit?: string;
}

class GrapeService {
  public async getGrapes(query: GrapeQuery) {
    const { search, type, region, body, acidity, page = '1', limit = '16' } = query;

    const filter: Record<string, unknown> = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (type) {
      filter.type = type.toLowerCase();
    }

    if (region) {
      filter.regions = region; // matching ID
    }

    if (body) {
      filter.body = body;
    }

    if (acidity) {
      filter.acidity = acidity;
    }

    const currentPage = Number(page);
    const currentLimit = Number(limit);
    const skip = (currentPage - 1) * currentLimit;

    const grapes = await Grape.find(filter)
      .populate('regions', 'name')
      .skip(skip)
      .limit(currentLimit);

    const totalCount = await Grape.countDocuments(filter);

    return {
      grapes,
      totalCount,
      totalPages: Math.ceil(totalCount / currentLimit),
      page: currentPage,
      limit: currentLimit,
    };
  }

  public async createGrape(data: Partial<IGrape>) {
    const newGrape = await Grape.create(data);
    return newGrape;
  }

  public async updateGrapeImages(grapeId: string, files: Express.Multer.File[]) {
    const imageUrls = await Promise.all(files.map((file) => uploadFile(file, 'grapes')));
    const updatedGrape = await Grape.findByIdAndUpdate(grapeId, { imageUrls }, { new: true });
    return updatedGrape;
  }
}

export default new GrapeService();
