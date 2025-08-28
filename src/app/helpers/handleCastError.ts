import { Response } from 'express';
import { Error } from 'mongoose';

export const handleCastError = (err: Error.CastError, res: Response) => {
  res.status(400).json({ success: false, message: err.message, error: err });
};