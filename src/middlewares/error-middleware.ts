import Logger from '@libs/logger';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  Logger.error(error?.message || 'Something went wrong');
  return res.status(500).json({ message: 'Something went wrong!' });
};
