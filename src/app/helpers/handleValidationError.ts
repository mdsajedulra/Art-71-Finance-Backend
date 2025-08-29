/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const handleValidationError = (err: any, res: Response) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    status: false,
    message: err.message,
    error: err,
  });
};
