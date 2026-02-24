import { HydratedDocument, Types } from 'mongoose';
import Tour, { ITour } from '@/models/tourModel';
import User from '@/models/userModel';
import Winery from '@/models/wineryModel';
import Region from '@/models/regionModel';
import HttpError from '@/utils/HttpError';

export interface PopulatedTour extends Omit<ITour, 'winery'> {
  winery: { _id: Types.ObjectId; name: string };
}

type TourFilter = { winery?: string };

export const getAllTours = async (query: { wineryId?: string }) => {
  const filter: TourFilter = {};

  if (query.wineryId) {
    filter.winery = query.wineryId;
  }

  return await Tour.find(filter);
};

export const getTourById = async (id: string) => {
  return await Tour.findById(id);
};

export const createTour = async (data: ITour, userId: string): Promise<HydratedDocument<ITour>> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError('User not found.', 404);
  }

  if (user.role !== 'WINERY_OWNER' && user.role !== 'ADMIN') {
    throw new HttpError('Only winery owners or administrators can create a tour.', 403);
  }

  const winery = await Winery.findById(data.winery);
  if (!winery) {
    throw new HttpError('Winery not found.', 404);
  }

  if (user.role === 'WINERY_OWNER' && winery.owner.toString() !== userId) {
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
