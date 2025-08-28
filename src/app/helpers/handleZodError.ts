/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

export const handleZodError = (err: any, res: Response) => {
  res.status(400).json({
    status: false,
    message: err.errors,
    error: err,
  });
};