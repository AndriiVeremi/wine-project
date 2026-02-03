import { Request, Response } from 'express';
import { firebaseAdmin } from '../services/firebase';
import User from '../models/userModel';
import { AuthenticatedRequest } from '../middleware/auth';
import HttpError from '../utils/HttpError';

const auth = firebaseAdmin.auth();

export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user?.uid) {
    throw new HttpError('Unauthorized', 401);
  }

  const user = await User.findOne({ firebaseUid: req.user.uid });

  if (!user) {
    throw new HttpError('User profile not found.', 404);
  }

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
            console.log(`Cleaned up Firebase user ${user.uid} due to a database or logic error.`);
        }
      } catch (cleanupError) {
        console.error('Failed to cleanup Firebase user:', cleanupError);
      }
    }
    
    if (error.code === 'auth/email-already-exists') {
      throw new HttpError('Email already in use.', 409);
    }
    if (error.code === 'auth/weak-password') {
        throw new HttpError('Password should be at least 6 characters.', 400);
    }
    if (error.code === 11000) {
        throw new HttpError('A user with this email or UID already exists in the database.', 409);
    }
    
    throw new HttpError('Error registering user', 500);
  }
};