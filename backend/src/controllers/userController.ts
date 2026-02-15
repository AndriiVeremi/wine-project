import { Request, Response } from 'express';
import { firebaseAdmin } from '@/services/firebase';
import User from '@/models/userModel';
import { AuthenticatedRequest } from '@/middleware/auth';
import HttpError from '@/utils/HttpError';
import * as userService from '@/services/userService';

const auth = firebaseAdmin.auth();

export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user?.uid) {
    throw new HttpError('Unauthorized', 401);
  }

  const user = await userService.getUserProfileByFirebaseUid(req.user.uid);

  res.status(200).json(user);
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, role } = req.body;
  const allowedRoles = ['USER', 'WINERY_OWNER'];
  const assignedRole = allowedRoles.includes(role) ? role : 'USER';

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    const uid = userRecord.uid;
    await auth.setCustomUserClaims(uid, { role: assignedRole });

    const newUser = new User({
      firebaseUid: uid,
      email: userRecord.email,
      firstName,
      lastName,
      role: assignedRole,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: newUser._id,
        uid: userRecord.uid,
        email: userRecord.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
    });
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code !== 'auth/email-already-exists') {
      try {
        const user = await auth.getUserByEmail(email);
        if (user) {
          await auth.deleteUser(user.uid);
          console.log(`User ${user.uid} deleted due to DB error.`);
        }
      } catch (cleanupError) {
        console.error('Failed to delete user', cleanupError);
      }
    }

    if (err.code === 'auth/email-already-exists') {
      throw new HttpError('This email is already in use.', 409);
    }
    if (err.code === 'auth/weak-password') {
      throw new HttpError('Password must be at least 6 characters long.', 400);
    }
    if (err.code === '11000') {
      throw new HttpError('User with this email already exists in the database.', 409);
    }

    throw new HttpError('User registration error', 500);
  }
};

export const getUserFavorites = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.userId) {
    throw new HttpError('Unauthorized', 401);
  }

  const favorites = await userService.getUserFavorites(req.userId);
  res.status(200).json(favorites);
};

export const addFavoriteWine = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.userId) {
    throw new HttpError('Unauthorized', 401);
  }

  const { wineId } = req.body;
  if (!wineId) {
    throw new HttpError('Wine ID is required', 400);
  }

  const result = await userService.addFavoriteWine(req.userId, wineId);
  res.status(200).json(result);
};

export const removeFavoriteWine = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.userId) {
    throw new HttpError('Unauthorized', 401);
  }

  const wineId = req.params.wineId as string;
  const result = await userService.removeFavoriteWine(req.userId, wineId);
  res.status(200).json(result);
};
