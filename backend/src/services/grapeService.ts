import { Types } from 'mongoose';
import Grape, { IGrape } from '@/models/grapeModel';
import Winery from '@/models/wineryModel';
import { uploadFile } from '@/services/firebase';
import HttpError from '@/utils/HttpError';

interface GrapeQuery {
  search?: string;
  type?: string;
  region?: string;
  body?: string;
  acidity?: string;
  page?: string;
  limit?: string;
  wineryId?: string;
}

class GrapeService {
  public async getGrapes(query: GrapeQuery) {
    const { search, type, region, body, acidity, page = '1', limit = '16', wineryId } = query;
    const filter: Record<string, unknown> = {};

    if (search) filter.name = { $regex: search, $options: 'i' };
    if (type) filter.type = type.toLowerCase();
    if (region) filter.regions = region;
    if (body) filter.body = body;
    if (acidity) filter.acidity = acidity;

    if (wineryId) {
      if (Types.ObjectId.isValid(wineryId)) {
        filter.winery = new Types.ObjectId(wineryId);
      } else {
        filter.winery = wineryId;
      }
    }

    const p = Number(page);
    const l = Number(limit);
    const skip = (p - 1) * l;

    const grapes = await Grape.find(filter).populate('regions', 'name').skip(skip).limit(l);
    const total = await Grape.countDocuments(filter);

    return {
      grapes,
      totalCount: total,
      totalPages: Math.ceil(total / l),
      page: p,
      limit: l,
    };
  }

  public async getGrapeById(id: string) {
    const grape = await Grape.findById(id).populate('regions', 'name');
    if (!grape) throw new HttpError('Grape variety not found', 404);
    return grape;
  }

  public async createGrape(
    data: Partial<IGrape>,
    userId: string,
    userRole: string,
    files?: Express.Multer.File[],
  ) {
    if (data.winery) {
      const winery = await Winery.findById(data.winery);
      if (!winery) throw new HttpError('Winery not found', 404);
      if (userRole !== 'ADMIN' && winery.owner.toString() !== userId) {
        throw new HttpError('Not owner', 403);
      }
    }

    if (files && files.length > 0) {
      const urls = await Promise.all(files.map((f) => uploadFile(f, 'grapes')));
      data.imageUrls = urls;
    }

    return await Grape.create(data);
  }

  public async updateGrape(
    id: string,
    data: Partial<IGrape>,
    userId: string,
    userRole: string,
    files?: Express.Multer.File[],
  ) {
    const grape = await Grape.findById(id);
    if (!grape) throw new HttpError('Not found', 404);

    if (grape.winery) {
      const winery = await Winery.findById(grape.winery);
      if (winery && userRole !== 'ADMIN' && winery.owner.toString() !== userId) {
        throw new HttpError('Not owner', 403);
      }
    }

    if (files && files.length > 0) {
      const urls = await Promise.all(files.map((f) => uploadFile(f, 'grapes')));
      data.imageUrls = urls;
    }

    return await Grape.findByIdAndUpdate(id, data, { new: true });
  }

  public async deleteGrape(id: string, userId: string, userRole: string) {
    const grape = await Grape.findById(id);
    if (!grape) throw new HttpError('Not found', 404);

    if (grape.winery) {
      const winery = await Winery.findById(grape.winery);
      if (winery && userRole !== 'ADMIN' && winery.owner.toString() !== userId) {
        throw new HttpError('Not owner', 403);
      }
    }

    await Grape.findByIdAndDelete(id);
  }

  public async updateGrapeImages(grapeId: string, files: Express.Multer.File[]) {
    const grape = await Grape.findById(grapeId);
    if (!grape) throw new HttpError('Grape not found', 404);

    const newUrls = await Promise.all(files.map((f) => uploadFile(f, 'grapes')));

    const updatedUrls = [...(grape.imageUrls || []), ...newUrls].slice(0, 5);

    return await Grape.findByIdAndUpdate(grapeId, { imageUrls: updatedUrls }, { new: true });
  }
}

export default new GrapeService();
