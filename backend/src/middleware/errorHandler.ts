import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error | AppError | ZodError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      details: err.errors,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  console.error('Unexpected error:', err);

  return res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
};
