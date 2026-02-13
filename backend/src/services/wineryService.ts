import Winery from '@/models/wineryModel';
import User from '@/models/userModel';
import HttpError from '@/utils/HttpError';
import { Types } from 'mongoose';

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
  const existingWinery = await Winery.findOne({ name: data.name });
  if (existingWinery) {
    throw new HttpError('Winery with this name already exists.', 409);
  }

  const newWinery = new Winery({
    ...data,
    owner: ownerId,
  });

  await newWinery.save();

  await User.findByIdAndUpdate(ownerId, { winery: newWinery._id });

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

  const query: any = {};

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

  return {
    wineries: [...vipWineries, ...regularWineries],
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
      throw new HttpError('Winery with this name already exists.', 409);
    }
  }

  Object.assign(winery, updateData);
  await winery.save();

  return winery;
};
