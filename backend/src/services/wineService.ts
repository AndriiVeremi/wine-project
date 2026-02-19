import { HydratedDocument, PipelineStage } from 'mongoose';
import Wine, { IWine } from '@/models/wineModel';
import Winery, { IWinery } from '@/models/wineryModel';
import User from '@/models/userModel';
import Grape from '@/models/grapeModel';
import HttpError from '@/utils/HttpError';

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
  sortBy?: string;
  page?: string;
  limit?: string;
}

export class WineService {
  public async getAllWines(
    query: WineQuery,
  ): Promise<{ wines: HydratedDocument<IWine>[]; totalCount: number }> {
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
      sortBy = 'name_asc',
      page = '1',
      limit = '10',
    } = query;

    const filter: Record<string, unknown> = {};
    const sort: Record<string, 1 | -1> = {};
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    if (name) filter.name = { $regex: name, $options: 'i' };

    if (country || region) {
      const wineryFilter: Record<string, string> = {};
      if (country) wineryFilter.country = country;
      if (region) wineryFilter.region = region;
      const matchingWineries = await Winery.find(wineryFilter).select('_id');
      const wineryIds = matchingWineries.map((w) => w._id);
      if (wineryIds.length > 0) {
        filter.winery = { $in: wineryIds };
      } else {
        return { wines: [], totalCount: 0 };
      }
    }

    if (color) filter.color = color;

    if (sweetness) filter.sweetness = sweetness;

    if (grape) {
      const foundGrape = await Grape.findOne({ name: grape }).select('_id');
      if (foundGrape) {
        filter.grape = foundGrape._id;
      } else {
        return { wines: [], totalCount: 0 };
      }
    }

    if (wineryId) filter.winery = wineryId;

    if (minRating) {
      filter.averageRating = { $gte: parseFloat(minRating) };
    }

    if (maxPrice) {
      filter.price = { $lte: parseFloat(maxPrice) };
    }

    if (vintage) filter.vintage = parseInt(vintage);

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
          as: 'wineryDetails',
        },
      },
      { $unwind: '$wineryDetails' },
      {
        $addFields: {
          isVip: '$wineryDetails.isVip',
        },
      },
      { $sort: { isVip: -1, ...sort } },
      { $skip: skip },
      { $limit: take },
      {
        $project: {
          wineryDetails: 0,
        },
      },
    ];

    const totalCountPipeline: PipelineStage[] = [
      { $match: filter },
      {
        $lookup: {
          from: 'wineries',
          localField: 'winery',
          foreignField: '_id',
          as: 'wineryDetails',
        },
      },
      { $unwind: '$wineryDetails' },
      { $count: 'total' },
    ];

    const wines = await Wine.aggregate(aggregationPipeline).exec();
    const totalCountResult = await Wine.aggregate(totalCountPipeline).exec();
    const totalCount = totalCountResult.length > 0 ? totalCountResult[0].total : 0;

    return { wines: wines as HydratedDocument<IWine>[], totalCount };
  }

  public async getWineById(wineId: string): Promise<HydratedDocument<IWine> | null> {
    const wine = await Wine.findById(wineId)
      .populate('winery', 'name isVip')
      .populate('grape', 'name')
      .exec();
    return wine;
  }

  public async createWine(wineData: IWine, userId: string): Promise<HydratedDocument<IWine>> {
    const user = await User.findById(userId);
    if (!user) {
      throw new HttpError('User not found.', 404);
    }

    if (user.role !== 'WINERY_OWNER' && user.role !== 'ADMIN') {
      throw new HttpError('Only winery owners or administrators can create wines.', 403);
    }

    const winery = await Winery.findById(wineData.winery);
    if (!winery) {
      throw new HttpError('Winery not found.', 404);
    }

    if (user.role === 'WINERY_OWNER' && winery.owner.toString() !== userId) {
      throw new HttpError('You are not the owner of this winery.', 403);
    }

    const grapeExists = await Grape.findById(wineData.grape);
    if (!grapeExists) {
      throw new HttpError('Grape variety not found.', 404);
    }

    const newWine = await Wine.create({ ...wineData });
    return newWine;
  }

  public async updateWine(
    wineId: string,
    updateData: Partial<IWine>,
    userId: string,
    userRole: string,
  ): Promise<HydratedDocument<IWine> | null> {
    const wine = await Wine.findById(wineId)
      .populate<{ winery: HydratedDocument<IWinery> }>('winery')
      .exec();

    if (!wine) {
      return null;
    }

    const winery = wine.winery;
    if (!winery) {
      throw new HttpError('Winery associated with this wine not found.', 404);
    }

    if (userRole !== 'ADMIN' && winery.owner.toString() !== userId) {
      throw new HttpError('You are not authorized to update this wine.', 403);
    }

    delete updateData.averageRating;
    delete updateData.vintage;
    delete updateData.winery;

    if (updateData.grape) {
      const grapeExists = await Grape.findById(updateData.grape);
      if (!grapeExists) {
        throw new HttpError('Grape variety not found.', 404);
      }
    }

    const updatedWine = await Wine.findByIdAndUpdate(wineId, updateData, { new: true });
    return updatedWine;
  }

  public async deleteWine(wineId: string, userId: string, userRole: string): Promise<void> {
    const wine = await Wine.findById(wineId)
      .populate<{ winery: HydratedDocument<IWinery> }>('winery')
      .exec();

    if (!wine) {
      throw new HttpError('Wine not found.', 404);
    }

    const winery = wine.winery;
    if (!winery) {
      throw new HttpError('Winery associated with this wine not found.', 404);
    }

    if (userRole !== 'ADMIN' && winery.owner.toString() !== userId) {
      throw new HttpError('You are not authorized to delete this wine.', 403);
    }

    await Wine.findByIdAndDelete(wineId);
  }
}
