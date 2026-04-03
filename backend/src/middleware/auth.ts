import { Request, Response, NextFunction } from 'express';
import { firebaseAdmin } from '@/services/firebase';
import { DecodedIdToken } from 'firebase-admin/auth';
import User from '@/models/userModel';

export interface AuthenticatedRequest extends Request {
  user?: DecodedIdToken;
  userId?: string;
  userRole?: string;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).send({ message: 'Unauthorized: Missing or invalid token format.' });
    return;
  }

  const token = authorization.split('Bearer ')[1];
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = decodedToken;

    let mongoUser = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!mongoUser) {
      console.log(`Creating new MongoDB profile for Firebase user: ${decodedToken.uid}`);
      const nameParts = (decodedToken.name || 'New User').split(' ');
      mongoUser = await User.create({
        firebaseUid: decodedToken.uid,
        firstName: nameParts[0] || 'New',
        lastName: nameParts.slice(1).join(' ') || 'User',
        email: decodedToken.email || `user_${decodedToken.uid}@temporary.com`,
        role: 'USER',
      });
    }

    req.userId = mongoUser._id.toString();
    const tokenRole = decodedToken.role as string;
    const dbRole = mongoUser.role;

    if (tokenRole === 'ADMIN' || dbRole === 'ADMIN') {
      req.userRole = 'ADMIN';
    } else {
      req.userRole = tokenRole || dbRole || 'USER';
    }

    next();
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized: Invalid token.', error });
  }
};

export const roleMiddleware = (allowedRoles: string[]) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.userRole;

    if (!req.user || !req.userId || !userRole) {
      return res.status(403).send({
        message: 'User authentication or profile data is incomplete.',
      });
    }

    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).send({ message: 'You do not have the required permissions.' });
    }
  };
};
