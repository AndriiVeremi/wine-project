import User from '@/models/userModel';
import Wine from '@/models/wineModel';
import Winery from '@/models/wineryModel';
import HttpError from '@/utils/HttpError';
import { firebaseAdmin } from '@/services/firebase';
import { Types } from 'mongoose';

const auth = firebaseAdmin.auth();

export const getUserProfileByFirebaseUid = async (firebaseUid: string) => {
  if (!firebaseUid) {
    throw new HttpError('Firebase UID is required', 400);
  }

  const user = await User.findOne({ firebaseUid })
    .select('-password -__v')
    .populate('winery', 'name')
    .populate('favoriteWines', 'name imageUrl type color');

  if (!user) {
    throw new HttpError('User profile not found.', 404);
  }

  return user;
};

export const updateUserRole = async (
  userId: Types.ObjectId | string,
  newRole: 'USER' | 'WINERY_OWNER' | 'ADMIN',
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError('User not found', 404);
  }

  user.role = newRole;
  await user.save();

  await auth.setCustomUserClaims(user.firebaseUid, { role: newRole });

  return user;
};

export const getUserFavorites = async (userId: string) => {
  const user = await User.findById(userId).populate({
    path: 'favoriteWines',
    populate: {
      path: 'winery',
      select: 'name',
    },
  });

  if (!user) {
    throw new HttpError('User not found', 404);
  }

  return user.favoriteWines.map((wine: any) => ({
    id: wine._id,
    name: wine.name,
    winery: wine.winery ? { id: wine.winery._id, name: wine.winery.name } : null,
    imageUrl: wine.imageUrl,
    color: wine.color,
    sweetness: wine.sweetness,
  }));
};

export const addFavoriteWine = async (userId: string, wineId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError('User not found', 404);
  }

  const wine = await Wine.findById(wineId);
  if (!wine) {
    throw new HttpError('Wine not found', 404);
  }

  if (user.favoriteWines.some((id) => id.toString() === wineId)) {
    throw new HttpError('Wine is already in favorites', 400);
  }

  user.favoriteWines.push(new Types.ObjectId(wineId));
  await user.save();

  return { message: 'Wine added to favorites' };
};

export const removeFavoriteWine = async (userId: string, wineId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError('User not found', 404);
  }

  const wineIndex = user.favoriteWines.findIndex((id) => id.toString() === wineId);
  if (wineIndex === -1) {
    throw new HttpError('Wine not found in favorites', 404);
  }

  user.favoriteWines.splice(wineIndex, 1);
  await user.save();

  return { message: 'Wine removed from favorites' };
};
