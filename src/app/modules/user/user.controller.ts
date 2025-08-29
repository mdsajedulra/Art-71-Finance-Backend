/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';

const createUser = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await userService.createUser(payload);

  sendResponse(res, {
    message: 'user create Seccussfully',
    statusCode: StatusCodes.CREATED,
    success: true,
    data: result,
  });
});

//get all user only admin

const getAllUser = catchAsync(async (req, res, next) => {
  const result = await userService.getAllUser();
  sendResponse(res, {
    message: 'user get Seccussfully',
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

// block user

const blockUser = catchAsync(async (req, res, next) => {
  const result = await userService.blockUser(req.params.userId);
  sendResponse(res, {
    message: 'user block Seccussfully',
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

export const userController = {
  createUser,
  getAllUser,
  blockUser,
};