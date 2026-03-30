import User from '@/models/userModel';
import Wine from '@/models/wineModel';
import HttpError from '@/utils/HttpError';
import { firebaseAdmin, uploadFile } from '@/services/firebase';
import { Types } from 'mongoose';

const auth = firebaseAdmin.auth();

const DEFAULT_AVATAR =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNzU3NTc1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTEyIDEwYzg5LjkzOCAwIDgtNy05OC04LTcgOC03IDh6bTAgMmMtMi42NyAwLTggMS40NC04IDR2MmgyMnYtMmMwLTIuNTYtNS4zMy00LTgtNHoiLz48cGF0aCBkPSJNOCAyMXYtMmMwLTIuNTYgNS4zMy00IDgtNHMyLjY3IDEuNDQgMiA0djJ6Ii8+PC9zdmc+';

export const getUserProfileByFirebaseUid = async (firebaseUid: string) => {
  if (!firebaseUid) {
    throw new HttpError('Firebase UID is required', 400);
  }

  const user = await User.findOne({ firebaseUid })
    .select('-__v')
    .populate('winery')
    .populate({
      path: 'favoriteWines',
      select: 'name imageUrl sweetness color winery',
      populate: {
        path: 'winery',
        select: 'name',
      },
    });

  if (!user) {
    throw new HttpError('User profile not found.', 404);
  }

  return user;
};

export const updateUserProfile = async (
  userId: string,
  updateData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    birthDate?: string;
    address?: string;
  },
) => {
  const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-__v');
  if (!user) {
    throw new HttpError('User not found', 404);
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

  interface PopulatedWine {
    _id: Types.ObjectId;
    name: string;
    winery?: { _id: Types.ObjectId; name: string };
    imageUrl: string;
    color: string;
    sweetness: string;
  }

  return user.favoriteWines.map((wine: unknown) => {
    const w = wine as PopulatedWine;
    return {
      id: w._id,
      name: w.name,
      winery: w.winery ? { id: w.winery._id, name: w.winery.name } : null,
      imageUrl: w.imageUrl,
      color: w.color,
      sweetness: w.sweetness,
    };
  });
};

export const addFavoriteWine = async (userId: string, wineId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError('User not found', 404);
  }

  if (user.role === 'WINERY_OWNER') {
    throw new HttpError('Winery owners cannot add wines to favorites', 403);
  }

  const wine = await Wine.findById(wineId);
  if (!wine) {
    throw new HttpError('Wine not found', 404);
  }

  if (user.favoriteWines.some((id) => id.toString() === wineId)) {
    throw new HttpError('Wine already in favorites', 400);
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
    throw new HttpError('Wine not in favorites', 404);
  }

  user.favoriteWines.splice(wineIndex, 1);
  await user.save();

  return { message: 'Wine removed from favorites' };
};

export const updateAvatar = async (userId: string, file: Express.Multer.File) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError('User not found', 404);
  }

  const avatarUrl = await uploadFile(file, 'avatars');
  user.avatarUrl = avatarUrl;
  await user.save();

  return { avatarUrl: user.avatarUrl };
};

export const getDefaultAvatar = () => DEFAULT_AVATAR;
