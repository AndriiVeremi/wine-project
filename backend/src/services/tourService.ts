import { HydratedDocument, Types } from 'mongoose';
import Tour, { ITour } from '@/models/tourModel';
import User from '@/models/userModel';
import Winery from '@/models/wineryModel';
import Region from '@/models/regionModel';
import HttpError from '@/utils/HttpError';
import { deleteFile } from '@/services/firebase';

export interface PopulatedTour extends Omit<ITour, 'winery'> {
  winery: { _id: Types.ObjectId; name: string };
}

export const getAllTours = async (query: { page?: string; limit?: string; wineryId?: string }) => {
  const page = parseInt(query.page || '1', 10);
  const limit = parseInt(query.limit || '10', 10);
  const skip = (page - 1) * limit;
  const { wineryId } = query;

  const filter: Record<string, string | Types.ObjectId> = {};
  if (wineryId && Types.ObjectId.isValid(wineryId)) {
    filter.winery = new Types.ObjectId(wineryId);
  } else if (wineryId) {
    filter.winery = wineryId;
  }

  const tours = await Tour.find(filter).skip(skip).limit(limit);
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

export const updateTour = async (
  id: string,
  updateData: Partial<ITour>,
  userId: string,
): Promise<HydratedDocument<ITour>> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError('User not found.', 404);
  }

  const tour = await Tour.findById(id);
  if (!tour) {
    throw new HttpError('Tour not found.', 404);
  }

  const winery = await Winery.findById(tour.winery);
  if (!winery) {
    throw new HttpError('Winery not found.', 404);
  }

  const isOwner = winery.owner.toString() === userId;
  const isAdmin = user.role === 'ADMIN';

  if (!isOwner && !isAdmin) {
    throw new HttpError('You do not have permission to update this tour.', 403);
  }

  const updatedTour = await Tour.findByIdAndUpdate(id, updateData, { new: true });

  if (!updatedTour) {
    throw new HttpError('Tour not found.', 404);
  }

  return updatedTour;
};

export const deleteTour = async (id: string, userId: string): Promise<void> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError('User not found.', 404);
  }

  const tour = await Tour.findById(id);
  if (!tour) {
    throw new HttpError('Tour not found.', 404);
  }

  const winery = await Winery.findById(tour.winery);
  if (!winery) {
    throw new HttpError('Winery not found.', 404);
  }

  const isOwner = winery.owner.toString() === userId;
  const isAdmin = user.role === 'ADMIN';

  if (!isOwner && !isAdmin) {
    throw new HttpError('You do not have permission to delete this tour.', 403);
  }

  if (tour.images && tour.images.length > 0) {
    await Promise.all(tour.images.map((url) => deleteFile(url)));
  }

  await Tour.findByIdAndDelete(id);
};
