import Winery from '@/models/wineryModel';
import Wine from '@/models/wineModel';
import User, { IUser } from '@/models/userModel';
import HttpError from '@/utils/HttpError';
import { sanitize } from '@/utils/sanitize';
import mongoose, { Types } from 'mongoose';

// Simple function to get winery rating
async function getRatingForWinery(wineryId: Types.ObjectId | string) {
  // If id is not a valid mongo id (like in tests "1", "2"), return zeros
  if (!mongoose.isValidObjectId(wineryId)) {
    return { average: 0, count: 0 };
  }

  const wines = await Wine.find({ winery: wineryId });
  if (wines.length === 0) return { average: 0, count: 0 };

  let totalRating = 0;
  let reviewsCount = 0;
  let winesWithRating = 0;

  for (const wine of wines) {
    if (wine.averageRating > 0) {
      totalRating += wine.averageRating;
      winesWithRating++;
    }
    reviewsCount += wine.totalReviews || 0;
  }

  const average = winesWithRating > 0 ? totalRating / winesWithRating : 0;
  return { average: Number(average.toFixed(1)), count: reviewsCount };
}

interface WineryData {
  name: string;
  history?: string;
  country: string;
  region: string;
  address?: string;
  logoUrl?: string;
  galleryUrl?: string[];
  whereToBuy?: Array<{ name: string; url: string }>;
  contactEmail: string;
  contactPhone: string;
}

export const createWinery = async (ownerId: Types.ObjectId | string, data: WineryData) => {
  const user = await User.findById(ownerId);
  if (user?.winery) {
    throw new HttpError('You already have a winery registered.', 400);
  }

  const existingWinery = await Winery.findOne({ name: data.name });
  if (existingWinery) {
    throw new HttpError('Winery with this name already exist.', 409);
  }

  if (data.history) {
    data.history = sanitize(data.history);
  }

  const newWinery = new Winery({
    ...data,
    owner: ownerId,
  });

  await newWinery.save();

  await User.findByIdAndUpdate(ownerId, { winery: newWinery._id }, { new: true });

  return newWinery;
};

interface GetWineriesParams {
  search?: string;
  countryId?: string;
  regionId?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export const getWineries = async (params: GetWineriesParams) => {
  const { search, countryId, regionId, sortBy, page = 1, limit = 10 } = params;

  const query: Record<string, unknown> = {};

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }
  if (countryId) {
    query.country = new Types.ObjectId(countryId);
  }
  if (regionId) {
    query.region = new Types.ObjectId(regionId);
  }

  const sort: { [key: string]: 1 | -1 } = {};
  if (sortBy) {
    const [field, order] = sortBy.split('_');
    if (field && order) {
      sort[field] = order === 'asc' ? 1 : -1;
    }
  }

  const vipWineries = await Winery.find({ ...query, isVip: true })
    .sort(sort)
    .populate('country', 'name')
    .populate('region', 'name');

  const regularWineries = await Winery.find({ ...query, isVip: false })
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('country', 'name')
    .populate('region', 'name');

  const totalCount = await Winery.countDocuments(query);

  const allWineries = [...vipWineries, ...regularWineries];

  // Simple loop to add rating data
  const wineriesWithRatings = [];
  for (const w of allWineries) {
    const ratingData = await getRatingForWinery(w._id as Types.ObjectId);
    const winObj = typeof w.toObject === 'function' ? w.toObject() : w;
    const extendedWinery = {
      ...winObj,
      averageRating: ratingData.average,
      totalReviews: ratingData.count,
    };
    wineriesWithRatings.push(extendedWinery);
  }

  return {
    wineries: wineriesWithRatings,
    totalCount,
    page,
    limit,
    totalPages: Math.ceil(totalCount / limit),
  };
};

export const getWineryById = async (wineryId: Types.ObjectId | string) => {
  const winery = await Winery.findById(wineryId)
    .populate('owner', 'firstName lastName email')
    .populate('country', 'name')
    .populate('region', 'name');

  if (!winery) {
    throw new HttpError('Winery not found.', 404);
  }

  return winery;
};

export const getWineryByName = async (wineryName: string) => {
  const winery = await Winery.findOne({ name: { $regex: wineryName, $options: 'i' } })
    .populate('owner', 'firstName lastName email')
    .populate('country', 'name')
    .populate('region', 'name');

  return winery;
};

export const updateWinery = async (
  wineryId: Types.ObjectId | string,
  updateData: Partial<WineryData>,
) => {
  const winery = await Winery.findById(wineryId);
  if (!winery) {
    throw new HttpError('Winery not found.', 404);
  }

  if (updateData.name && updateData.name !== winery.name) {
    const existingWinery = await Winery.findOne({ name: updateData.name });
    if (existingWinery && existingWinery._id.toString() !== wineryId.toString()) {
      throw new HttpError('Winery with this name already exist.', 409);
    }
  }

  if (updateData.history) {
    updateData.history = sanitize(updateData.history);
  }

  Object.assign(winery, updateData);
  await winery.save();

  return winery;
};

export const deleteWineryById = async (wineryId: Types.ObjectId | string, user: IUser) => {
  const winery = await Winery.findById(wineryId);
  if (!winery) {
    throw new HttpError('Winery not found.', 404);
  }

  if (user.role !== 'ADMIN' && winery.owner.toString() !== user._id.toString()) {
    throw new HttpError('You cant delete this winery.', 403);
  }

  if (winery.owner) {
    await User.findByIdAndUpdate(winery.owner, { $unset: { winery: 1 } });
  }

  await Winery.findByIdAndDelete(wineryId);
};
