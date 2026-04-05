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
    const isAdmin = userRole === 'ADMIN';

    if (data.winery && !isAdmin) {
      const winery = await Winery.findById(data.winery);
      if (!winery) throw new HttpError('Winery not found', 404);
      if (winery.owner.toString() !== userId) {
        throw new HttpError('Not owner', 403);
      }
    } else if (data.winery && isAdmin) {
      const winery = await Winery.findById(data.winery);
      if (!winery) throw new HttpError('Winery not found', 404);
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

    let imagesToKeep: string[] = [];
    if (data.imageUrls) {
      imagesToKeep = Array.isArray(data.imageUrls) ? data.imageUrls : [data.imageUrls];
    }

    const currentUrls = grape.imageUrls || [];

    const removedUrls = currentUrls.filter((url) => !imagesToKeep.includes(url));
    if (removedUrls.length > 0) {
      await Promise.all(removedUrls.map((url) => deleteFile(url)));
    }

    let updatedUrls = [...imagesToKeep];
    if (files && files.length > 0) {
      const isMainPhotoReplaced =
        imagesToKeep.length === 0 || !imagesToKeep.includes(currentUrls[0]);
      const newUrls = await Promise.all(files.map((f) => uploadFile(f, 'grapes')));
      if (isMainPhotoReplaced && newUrls.length > 0) {
        updatedUrls = [newUrls[0], ...imagesToKeep, ...newUrls.slice(1)];
      } else {
        updatedUrls = [...imagesToKeep, ...newUrls];
      }
    }

    const finalUrls = updatedUrls.slice(0, 5);
    if (updatedUrls.length > 5) {
      const droppedUrls = updatedUrls.slice(5);
      await Promise.all(droppedUrls.map((url) => deleteFile(url)));
    }

    data.imageUrls = finalUrls;

    return await Grape.findByIdAndUpdate(id, data, { new: true });
  }

  public async deleteGrape(id: string, userId: string, userRole: string) {
    const grape = await Grape.findById(id);
    if (!grape) throw new HttpError('Not found', 404);

    const isAdmin = userRole === 'ADMIN';

    if (grape.winery && !isAdmin) {
      const winery = await Winery.findById(grape.winery);
      if (winery && winery.owner.toString() !== userId) {
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
