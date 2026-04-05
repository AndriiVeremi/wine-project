import Winery, { IWinery } from '@/models/wineryModel';
import User, { IUser } from '@/models/userModel';
import Location from '@/models/locationModel';
import HttpError from '@/utils/HttpError';
import { sanitize } from '@/utils/sanitize';
import { Types, isValidObjectId } from 'mongoose';
import { deleteFile } from '@/services/firebase';

export const getAllWineries = async (params: {
  page?: string | number;
  limit?: string | number;
  search?: string;
  country?: string;
  region?: string;
  sortBy?: string;
}) => {
  const { page = 1, limit = 10, search, country, region, sortBy } = params;

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const query: Record<string, unknown> = {};

  if (search) {
    query.name = { $regex: sanitize(search), $options: 'i' };
  }

  if (country) {
    if (isValidObjectId(country)) {
      query.country = country;
    } else {
      const countryDoc = await Location.findOne({
        name: { $regex: new RegExp(`^${country}$`, 'i') },
        type: 'country',
      });
      if (countryDoc) {
        query.country = countryDoc._id;
      } else {
        // Якщо країну не знайдено, повертаємо порожній список
        return {
          wineries: [],
          totalCount: 0,
          page: pageNum,
          limit: limitNum,
          totalPages: 0,
        };
      }
    }
  }

  if (region) {
    if (isValidObjectId(region)) {
      query.region = region;
    } else {
      const regionDoc = await Location.findOne({
        name: { $regex: new RegExp(`^${region}$`, 'i') },
        type: 'region',
      });
      if (regionDoc) {
        query.region = regionDoc._id;
      } else {
        return {
          wineries: [],
          totalCount: 0,
          page: pageNum,
          limit: limitNum,
          totalPages: 0,
        };
      }
    }
  }

  const sort: { [key: string]: 1 | -1 } = {};
  if (sortBy) {
    const [field, order] = (sortBy as string).split('_');
    if (field && order) {
      sort[field] = order === 'asc' ? 1 : -1;
    }
  }

  const wineries = await Winery.find(query)
    .sort({ isVip: -1, ...sort })
    .skip(skip)
    .limit(limitNum)
    .populate('country', 'name')
    .populate('region', 'name');

  const totalCount = await Winery.countDocuments(query);

  return {
    wineries,
    totalCount,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(totalCount / limitNum),
  };
};

export const deleteWineryById = async (wineryId: string, user: IUser) => {
  const winery = await Winery.findById(wineryId);
  if (!winery) {
    throw new HttpError('Winery not found', 404);
  }

  const isOwner = winery.owner.toString() === user._id.toString();
  const isAdmin = user.role === 'ADMIN';

  if (!isOwner && !isAdmin) {
    throw new HttpError('You do not have permission to delete this winery.', 403);
  }

  if (winery.logoUrl) {
    await deleteFile(winery.logoUrl);
  }

  if (winery.galleryUrl && winery.galleryUrl.length > 0) {
    await Promise.all(winery.galleryUrl.map((url) => deleteFile(url)));
  }

  await User.findByIdAndUpdate(winery.owner, { $unset: { winery: '' } });
  await Winery.findByIdAndDelete(wineryId);

  return { message: 'Winery deleted successfully' };
};

export const getWineryById = async (wineryId: Types.ObjectId | string) => {
  const winery = await Winery.findById(wineryId)
    .populate('country', 'name')
    .populate('region', 'name');

  if (!winery) {
    throw new HttpError('Winery not found', 404);
  }

  return winery;
};

export const createWinery = async (ownerId: string, wineryData: Partial<IWinery>) => {
  const existingWinery = await Winery.findOne({ name: wineryData.name });
  if (existingWinery) {
    throw new HttpError('Winery with this name already exists', 400);
  }

  const newWinery = new Winery({
    ...wineryData,
    owner: ownerId,
  });

  await newWinery.save();
  await User.findByIdAndUpdate(ownerId, { winery: newWinery._id });

  return newWinery;
};

export const updateWinery = async (wineryId: string, wineryData: Partial<IWinery>) => {
  const updatedWinery = await Winery.findByIdAndUpdate(wineryId, wineryData, {
    new: true,
    runValidators: true,
  });

  if (!updatedWinery) {
    throw new HttpError('Winery not found', 404);
  }

  return updatedWinery;
};

export const getWineryByOwnerId = async (ownerId: string) => {
  const winery = await Winery.findOne({ owner: ownerId })
    .populate('country', 'name')
    .populate('region', 'name');

  return winery;
};

export const getWineryByName = async (name: string) => {
  const winery = await Winery.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } })
    .populate('country', 'name')
    .populate('region', 'name');

  return winery;
};
