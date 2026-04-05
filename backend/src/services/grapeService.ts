import { Types } from 'mongoose';
import Grape, { IGrape } from '@/models/grapeModel';
import Winery from '@/models/wineryModel';
import { uploadFile, deleteFile } from '@/services/firebase';
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

    let updatedUrls = grape.imageUrls || [];

    if (data.imageUrls && Array.isArray(data.imageUrls)) {
      const removedUrls = updatedUrls.filter((url) => !data.imageUrls!.includes(url));
      if (removedUrls.length > 0) {
        await Promise.all(removedUrls.map((url) => deleteFile(url)));
      }
      updatedUrls = data.imageUrls;
    }

    if (files && files.length > 0) {
      const newUrls = await Promise.all(files.map((f) => uploadFile(f, 'grapes')));
      const finalUrls = [...updatedUrls, ...newUrls];

      if (finalUrls.length > 5) {
        const droppedUrls = finalUrls.slice(5);
        await Promise.all(droppedUrls.map((url) => deleteFile(url)));
        updatedUrls = finalUrls.slice(0, 5);
      } else {
        updatedUrls = finalUrls;
      }
    }

    data.imageUrls = updatedUrls;

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

    if (grape.imageUrls && grape.imageUrls.length > 0) {
      await Promise.all(grape.imageUrls.map((url) => deleteFile(url)));
    }

    await Grape.findByIdAndDelete(id);
  }

  public async updateGrapeImages(grapeId: string, files: Express.Multer.File[]) {
    const grape = await Grape.findById(grapeId);
    if (!grape) throw new HttpError('Grape not found', 404);

    const newUrls = await Promise.all(files.map((f) => uploadFile(f, 'grapes')));

    const combinedUrls = [...(grape.imageUrls || []), ...newUrls];
    const updatedUrls = combinedUrls.slice(0, 5);

    if (combinedUrls.length > 5) {
      const droppedUrls = combinedUrls.slice(5);
      await Promise.all(droppedUrls.map((url) => deleteFile(url)));
    }

    return await Grape.findByIdAndUpdate(grapeId, { imageUrls: updatedUrls }, { new: true });
  }
}

export default new GrapeService();
