import { env } from '@libs/configs';
import { AppException } from '@libs/exceptions/app-exception';
import { ErrorCodes } from '@libs/exceptions/error-codes';
import { ValidationException } from '@libs/exceptions/validation-exception';
import Logger from '@libs/logger';
import { NextFunction, Request, Response } from 'express';

const isDev = env.APP_ENV === 'development';

export const SERVER_SIDE_ERRORS_CODES = [
  'DB_COULD_NOT_CONNECT',
  'DB_TIMEOUT',
  'DB_QUERY_FAILED',
  'DB_RECORD_NOT_FOUND',
  'DB_CONSTRAINT_VIOLATION',
  'REDIS_COULD_NOT_CONNECT',
  'NO_QUEUE_FOUND',
  'REDIS_TIMEOUT',
  'QUEUE_PROCESSING_FAILED',
  'THIRD_PARTY_SERVICE_ERROR',
  'NETWORK_ERROR',
  'TIMEOUT_ERROR',
];
/**
 * Global error handling middleware
 *
 * @param err - The Express error (can be ours or another)
 * @param req - The initial request
 * @param res - The response object
 * @param next - Allows passing to the next middleware if it exists
 *
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  // TODO Make sentry catch exception here before handling it

  if (err instanceof AppException) {
    return res.status(err.status).json({
      code:
        err.code && isDev
          ? SERVER_SIDE_ERRORS_CODES.includes(err.code)
            ? 'INTERNAL_SERVER_ERROR'
            : err.code
          : undefined, //replace sensitive errors with Internal_Server_error or handle it yourself on code, but this will show in dev mode
      message: err.message,
      stack: isDev ? err.stack : undefined,
      cause: isDev && err.cause ? (err.cause as Error).message : undefined,
    });
  }

  if (err instanceof ValidationException) {
    return res.status(err.status).json({
      code: err.code,
      message: err.message,
      violations: err.violations,
      stack: isDev ? err.stack : undefined,
      cause: isDev && err.cause ? (err.cause as Error).message : undefined,
    });
  }

  /**
   * In other cases, we return a 500
   */
  Logger.error(err);
  return res.status(500).json({
    message: 'Something went wrong',
    code: ErrorCodes.INTERNAL_SERVER_ERROR,
  });
};
