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

    const mongoUser = await User.findOne({ firebaseUid: decodedToken.uid });

    if (mongoUser) {
      req.userId = mongoUser._id.toString();
      req.userRole = mongoUser.role;
    } else {
      console.warn(`Firebase user ${decodedToken.uid} found, but no corresponding MongoDB user.`);
      res.status(401).send({ message: 'Unauthorized: User profile not found.' });
      return;
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
        message:
          'User authentication or profile data is incomplete.',
      });
    }

    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).send({ message: 'You do not have the required permissions.' });
    }
  };
};
