import { Request, Response, NextFunction } from 'express';
import { firebaseAdmin } from '../services/firebase';
import { DecodedIdToken } from 'firebase-admin/auth';

export interface AuthenticatedRequest extends Request {
  user?: DecodedIdToken;
}

// Middleware для автентифікації (перевіряє чи валідний токен)
export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).send({ message: 'Unauthorized: Missing or invalid tok format.' });
    return;
  }

  const token = authorization.split('Bearer ')[1];
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized: Invalid token.', error });
  }
};

// Middleware для авторизації (перевіряє чи є у користувача роль)
export const roleMiddleware = (allowedRoles: string[]) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role as string;

    if (!req.user) {
      return res
        .status(500)
        .send({
          message: 'Server error: User object not found. Ensure authMiddleware runs first.',
        });
    }

    if (userRole && allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).send({ message: 'Forbidden: You do not have the Srequired permissions.' });
    }
  };
};
