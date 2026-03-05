import * as express from 'express';
import { firebaseAdmin } from '@/services/firebase';
import User from '@/models/userModel';
import { AuthenticatedRequest } from '@/middleware/auth';
import HttpError from '@/utils/HttpError';
import * as userService from '@/services/userService';
import ctrlWrapper from '@/utils/ctrlWrapper';
import upload from '@/middleware/uploadMiddleware';

export const getUserProfile = ctrlWrapper(
  async (req: AuthenticatedRequest, res: express.Response) => {
    const user = await userService.getUserProfileByFirebaseUid(req.user!.uid);
    res.status(200).json(user);
  },
);

export const updateUserProfile = ctrlWrapper(
  async (req: AuthenticatedRequest, res: express.Response) => {
    const updatedUser = await userService.updateUserProfile(req.userId!, req.body);
    res.status(200).json(updatedUser);
  },
);

export const registerUser = async (req: express.Request, res: express.Response) => {
  const { email, password, firstName, lastName, role } = req.body;
  const allowedRoles = ['USER', 'WINERY_OWNER'];
  const assignedRole = allowedRoles.includes(role) ? role : 'USER';

  try {
    const userRecord = await firebaseAdmin.auth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    const uid = userRecord.uid;
    await firebaseAdmin.auth().setCustomUserClaims(uid, { role: assignedRole });

    const newUser = new User({
      firebaseUid: uid,
      email: userRecord.email,
      firstName,
      lastName,
      role: assignedRole,
      avatarUrl: userService.getDefaultAvatar(),
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
        const user = await firebaseAdmin.auth().getUserByEmail(email);
        if (user) {
          await firebaseAdmin.auth().deleteUser(user.uid);
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

    throw new HttpError('User registration error', 500);
  }
};

export const getUserFavorites = ctrlWrapper(
  async (req: AuthenticatedRequest, res: express.Response) => {
    const favorites = await userService.getUserFavorites(req.userId!);
    res.status(200).json(favorites);
  },
);

export const addFavoriteWine = ctrlWrapper(
  async (req: AuthenticatedRequest, res: express.Response) => {
    const { wineId } = req.body;
    if (!wineId) {
      throw new HttpError('Wine ID is required', 400);
    }

    const result = await userService.addFavoriteWine(req.userId!, wineId);
    res.status(200).json(result);
  },
);

export const removeFavoriteWine = ctrlWrapper(
  async (req: AuthenticatedRequest, res: express.Response) => {
    const wineId = req.params.wineId as string;
    const result = await userService.removeFavoriteWine(req.userId!, wineId);
    res.status(200).json(result);
  },
);

export const updateAvatar = [
  upload.single('avatar'),
  ctrlWrapper(async (req: AuthenticatedRequest, res: express.Response) => {
    if (!req.file) {
      throw new HttpError('Avatar file is required', 400);
    }

    const result = await userService.updateAvatar(req.userId!, req.file);
    res.status(200).json(result);
  }),
];

export {};
