import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@utils/jwt';
import { AppException } from '@libs/exceptions/app-exception';

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    throw AppException.unauthenticated({
      message: 'Unauthorized',
    });
  }

  verifyToken(token); //implement this well
  next();
};
