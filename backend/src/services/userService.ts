import User from '@/models/userModel';
import HttpError from '@/utils/HttpError';
import { firebaseAdmin } from './firebase';
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
