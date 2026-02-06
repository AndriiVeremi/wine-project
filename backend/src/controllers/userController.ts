import { Request, Response } from 'express';
import { firebaseAdmin } from '../services/firebase';
import User from '../models/userModel';
import { AuthenticatedRequest } from '../middleware/auth';
import HttpError from '../utils/HttpError';
import * as userService from '../services/userService';

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
  } catch (error: any) {
    if (error.code !== 'auth/email-already-exists') {
      try {
        const user = await auth.getUserByEmail(email);
        if (user) {
          await auth.deleteUser(user.uid);
          console.log(
            `Видалено користувача Firebase ${user.uid} через помилку бази даних або логіки.`,
          );
        }
      } catch (cleanupError) {
        console.error('Не вдалося видалити користувача Firebase:', cleanupError);
      }
    }

    if (error.code === 'auth/email-already-exists') {
      throw new HttpError('Email вже використовується.', 409);
    }
    if (error.code === 'auth/weak-password') {
      throw new HttpError('Пароль повинен містити щонайменше 6 символів.', 400);
    }
    if (error.code === 11000) {
      throw new HttpError('Користувач з таким email або UID вже існує в базі даних.', 409);
    }

    throw new HttpError('Помилка реєстрації користувача', 500);
  }
};
