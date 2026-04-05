import { HydratedDocument, Types } from 'mongoose';
import Tour, { ITour } from '@/models/tourModel';
import Winery from '@/models/wineryModel';
import Region from '@/models/regionModel';
import HttpError from '@/utils/HttpError';
import { deleteFile } from '@/services/firebase';

export interface PopulatedTour extends Omit<ITour, 'winery'> {
  winery: { _id: Types.ObjectId; name: string };
}

export const getAllTours = async (query: {
  page?: string;
  limit?: string;
  wineryId?: string;
  region?: string;
  name?: string;
}) => {
  const page = parseInt(query.page || '1', 10);
  const limit = parseInt(query.limit || '10', 10);
  const skip = (page - 1) * limit;
  const { wineryId, region, name } = query;

  const filter: Record<string, unknown> = {};

  if (name) {
    filter.name = { $regex: name, $options: 'i' };
  }

  if (wineryId) {
    if (Types.ObjectId.isValid(wineryId)) {
      filter.winery = new Types.ObjectId(wineryId);
    } else {
      filter.winery = wineryId;
    }
  }

  if (region) {
    let regionId: Types.ObjectId | string = region;

    if (!Types.ObjectId.isValid(region)) {
      const foundRegion = await Region.findOne({
        name: { $regex: new RegExp(`^${region}$`, 'i') },
      });
      if (foundRegion) {
        regionId = foundRegion._id as Types.ObjectId;
      } else {
        return { tours: [], totalCount: 0, page, limit, totalPages: 0 };
      }
    }

    const wineriesInRegion = await Winery.find({ region: regionId }).select('_id');
    const wineryIds = wineriesInRegion.map((w) => w._id);

    if (wineryIds.length === 0) {
      return { tours: [], totalCount: 0, page, limit, totalPages: 0 };
    }

    if (filter.winery) {
      const wineryIdStr = filter.winery.toString();
      if (!wineryIds.map((id) => id.toString()).includes(wineryIdStr)) {
        return { tours: [], totalCount: 0, page, limit, totalPages: 0 };
      }
    } else {
      filter.winery = { $in: wineryIds };
    }
  }

  const tours = await Tour.find(filter)
    .populate({
      path: 'winery',
      select: 'name region',
      populate: { path: 'region', select: 'name' },
    })
    .skip(skip)
    .limit(limit);

  const totalCount = await Tour.countDocuments(filter);

  return {
    tours,
    totalCount,
    page,
    limit,
    totalPages: Math.ceil(totalCount / limit),
  };
};

export const getTourById = async (id: string): Promise<HydratedDocument<ITour>> => {
  const tour = await Tour.findById(id).populate({
    path: 'winery',
    populate: { path: 'region', select: 'name' },
  });

  if (!tour) {
    throw new HttpError('Tour not found.', 404);
  }

  return tour;
};

export const getToursByWinery = async (wineryId: string) => {
  return await Tour.find({ winery: wineryId });
};

export const createTour = async (
  data: ITour,
  userId: string,
  userRole: string,
): Promise<HydratedDocument<ITour>> => {
  const isAdmin = userRole === 'ADMIN';

  if (userRole !== 'WINERY_OWNER' && !isAdmin) {
    throw new HttpError('Only winery owners or administrators can create a tour.', 403);
  }

  const winery = await Winery.findById(data.winery);
  if (!winery) {
    throw new HttpError('Winery not found.', 404);
  }

  if (!isAdmin && winery.owner.toString() !== userId) {
    throw new HttpError('You are not the owner of this winery.', 403);
  }

  return await Tour.create({ ...data });
};

export const getToursByRegion = async (
  regionName: string,
): Promise<HydratedDocument<PopulatedTour>[]> => {
  const region = await Region.findOne({ name: { $regex: regionName, $options: 'i' } });

  if (!region) {
    throw new HttpError(`Region with name '${regionName}' not found.`, 404);
  }

  const wineriesInRegion = await Winery.find({ region: region._id }).select('_id');

  const wineryIds = wineriesInRegion.map((winery) => winery._id);

  if (wineryIds.length === 0) {
    return [];
  }

  const tours = (await Tour.find({ winery: { $in: wineryIds } }).populate(
    'winery',
    'name',
  )) as unknown as HydratedDocument<PopulatedTour>[];

  return tours;
};

export const updateTour = async (
  id: string,
  updateData: Partial<ITour>,
  userId: string,
  userRole: string,
): Promise<HydratedDocument<ITour>> => {
  const tour = await Tour.findById(id);
  if (!tour) {
    throw new HttpError('Tour not found.', 404);
  }

  const isAdmin = userRole === 'ADMIN';

  if (!isAdmin) {
    const winery = await Winery.findById(tour.winery);
    if (!winery) {
      throw new HttpError('Winery not found.', 404);
    }

    const isOwner = winery.owner.toString() === userId;
    if (!isOwner) {
      throw new HttpError('You do not have permission to update this tour.', 403);
    }
  }

  const updatedTour = await Tour.findByIdAndUpdate(id, updateData, { new: true });

  if (!updatedTour) {
    throw new HttpError('Tour not found.', 404);
  }

  return updatedTour;
};

export const deleteTour = async (id: string, userId: string, userRole: string): Promise<void> => {
  const tour = await Tour.findById(id);
  if (!tour) {
    throw new HttpError('Tour not found.', 404);
  }

  const isAdmin = userRole === 'ADMIN';

  if (!isAdmin) {
    const winery = await Winery.findById(tour.winery);
    if (!winery) {
      throw new HttpError('Winery not found.', 404);
    }

    const isOwner = winery.owner.toString() === userId;
    if (!isOwner) {
      throw new HttpError('You do not have permission to delete this tour.', 403);
    }
  }

  if (tour.images && tour.images.length > 0) {
    await Promise.all(tour.images.map((url) => deleteFile(url)));
  }

  await Tour.findByIdAndDelete(id);
};
