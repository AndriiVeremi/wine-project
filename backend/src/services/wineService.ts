import { HydratedDocument, PipelineStage, Types } from 'mongoose';
import Wine, { IWine } from '@/models/wineModel';
import Winery, { IWinery } from '@/models/wineryModel';
import User from '@/models/userModel';
import Grape from '@/models/grapeModel';
import HttpError from '@/utils/HttpError';
import { uploadFile } from '@/services/firebase';
import { sanitize } from '@/utils/sanitize';

interface WineQuery {
  country?: string;
  region?: string;
  color?: string;
  sweetness?: string;
  grape?: string;
  wineryId?: string;
  minRating?: string;
  maxPrice?: string;
  vintage?: string;
  name?: string;
  inStock?: string;
  sortBy?: string;
  page?: string;
  limit?: string;
}

export class WineService {
  public async getAllWines(query: WineQuery): Promise<{
    wines: HydratedDocument<IWine>[];
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const {
      country,
      region,
      color,
      sweetness,
      grape,
      wineryId,
      minRating,
      maxPrice,
      vintage,
      name,
      inStock,
      sortBy = 'name_asc',
      page = '1',
      limit = '10',
    } = query;

    const filter: Record<string, unknown> = {};
    const sort: Record<string, 1 | -1> = {};
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);
    const currentPage = parseInt(page);
    const currentLimit = parseInt(limit);

    if (name) filter.name = { $regex: name, $options: 'i' };

    if (country || region) {
      const wineryFilter: Record<string, string | Types.ObjectId> = {};
      if (country) wineryFilter.country = country;
      if (region) wineryFilter.region = region;

      const matchingWineries = await Winery.find(wineryFilter).select('_id');
      const wineryIds = matchingWineries.map((w) => w._id);
      if (wineryIds.length > 0) {
        filter.winery = { $in: wineryIds };
      } else {
        return { wines: [], totalCount: 0, page: currentPage, limit: currentLimit, totalPages: 0 };
      }
    }

    if (color) filter.color = color;
    if (sweetness) filter.sweetness = sweetness;

    if (grape) {
      const foundGrape = await Grape.findOne({ name: grape }).select('_id');
      if (foundGrape) {
        filter.grape = foundGrape._id;
      } else {
        return { wines: [], totalCount: 0, page: currentPage, limit: currentLimit, totalPages: 0 };
      }
    }

    if (wineryId) {
      if (Types.ObjectId.isValid(wineryId)) {
        filter.winery = new Types.ObjectId(wineryId);
      } else {
        filter.winery = wineryId;
      }
    }
    if (minRating) filter.averageRating = { $gte: parseFloat(minRating) };
    if (maxPrice) filter.price = { $lte: parseFloat(maxPrice) };
    if (vintage) filter.vintage = parseInt(vintage);
    if (inStock) filter.inStock = inStock === 'true';

    const [sortField, sortOrder] = sortBy.split('_');
    if (sortField && sortOrder) {
      sort[sortField] = sortOrder === 'asc' ? 1 : -1;
    }

    const aggregationPipeline: PipelineStage[] = [
      { $match: filter },
      {
        $lookup: {
          from: 'wineries',
          localField: 'winery',
          foreignField: '_id',
          as: 'winery',
        },
      },
      { $unwind: { path: '$winery', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'locations',
          localField: 'winery.country',
          foreignField: '_id',
          as: 'winery.country',
        },
      },
      { $unwind: { path: '$winery.country', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'locations',
          localField: 'winery.region',
          foreignField: '_id',
          as: 'winery.region',
        },
      },
      { $unwind: { path: '$winery.region', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'grapes',
          localField: 'grape',
          foreignField: '_id',
          as: 'grape',
        },
      },
      { $unwind: { path: '$grape', preserveNullAndEmptyArrays: true } },

      {
        $addFields: {
          isVip: '$winery.isVip',
        },
      },
      { $sort: { isVip: -1, ...sort } },
      { $skip: skip },
      { $limit: take },
    ];

    const totalCountPipeline: PipelineStage[] = [{ $match: filter }, { $count: 'total' }];

    const wines = await Wine.aggregate(aggregationPipeline).exec();
    const totalCountResult = await Wine.aggregate(totalCountPipeline).exec();
    const totalCount = totalCountResult.length > 0 ? totalCountResult[0].total : 0;
    const totalPages = Math.ceil(totalCount / currentLimit);

    return {
      wines: wines as HydratedDocument<IWine>[],
      totalCount,
      page: currentPage,
      limit: currentLimit,
      totalPages,
    };
  }

  public async getWineById(wineId: string): Promise<HydratedDocument<IWine>> {
    const wine = await Wine.findById(wineId)
      .populate({
        path: 'winery',
        select: 'name isVip country region logoUrl',
        populate: [
          { path: 'country', select: 'name' },
          { path: 'region', select: 'name' },
        ],
      })
      .populate('grape', 'name')
      .exec();

    if (!wine) {
      throw new HttpError('Wine not found.', 404);
    }

    return wine;
  }

  public async createWine(wineData: IWine, userId: string): Promise<HydratedDocument<IWine>> {
    const user = await User.findById(userId);
    if (!user) throw new HttpError('User not found.', 404);

    if (user.role !== 'WINERY_OWNER' && user.role !== 'ADMIN') {
      throw new HttpError('Only winery owners can create wines.', 403);
    }

    const winery = await Winery.findById(wineData.winery);
    if (!winery) throw new HttpError('Winery not found.', 404);

    if (user.role === 'WINERY_OWNER' && winery.owner.toString() !== userId) {
      throw new HttpError('You are not owner of this winery.', 403);
    }

    const grapeExists = await Grape.findById(wineData.grape);
    if (!grapeExists) throw new HttpError('Grape not found.', 404);

    if (wineData.description) {
      wineData.description = sanitize(wineData.description);
    }

    return await Wine.create({ ...wineData });
  }

  public async updateWine(
    wineId: string,
    updateData: Partial<IWine>,
    userId: string,
    userRole: string,
  ): Promise<HydratedDocument<IWine> | null> {
    const wine = await Wine.findById(wineId).populate('winery').exec();
    if (!wine) return null;

    const winery = wine.winery as unknown as HydratedDocument<IWinery>;
    if (!winery) throw new HttpError('Winery not found.', 404);

    if (userRole !== 'ADMIN' && winery.owner.toString() !== userId) {
      throw new HttpError('You cant update this wine.', 403);
    }

    if (updateData.grape) {
      const grapeExists = await Grape.findById(updateData.grape);
      if (!grapeExists) throw new HttpError('Grape not found.', 404);
    }

    if (updateData.description) {
      updateData.description = sanitize(updateData.description);
    }

    return await Wine.findByIdAndUpdate(wineId, updateData, { new: true });
  }

  public async updateWineImage(
    wineId: string,
    file: Express.Multer.File,
    userId: string,
    userRole: string,
  ): Promise<HydratedDocument<IWine> | null> {
    const wine = await Wine.findById(wineId).populate('winery').exec();
    if (!wine) return null;

    const winery = wine.winery as unknown as HydratedDocument<IWinery>;
    if (!winery) throw new HttpError('Winery not found.', 404);

    if (userRole !== 'ADMIN' && winery.owner.toString() !== userId) {
      throw new HttpError('You cant update this wine.', 403);
    }

    const imageUrl = await uploadFile(file, 'wines');
    return await Wine.findByIdAndUpdate(wineId, { imageUrl }, { new: true });
  }

  public async deleteWine(wineId: string, userId: string, userRole: string): Promise<void> {
    const wine = await Wine.findById(wineId).populate('winery').exec();
    if (!wine) throw new HttpError('Wine not found.', 404);

    const winery = wine.winery as unknown as HydratedDocument<IWinery>;
    if (!winery) throw new HttpError('Winery not found.', 404);

    if (userRole !== 'ADMIN' && winery.owner.toString() !== userId) {
      throw new HttpError('You cant delete this wine.', 403);
    }

    await Wine.findByIdAndDelete(wineId);
  }
}
