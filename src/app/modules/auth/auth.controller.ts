import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';


const register = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await authService.register(payload);
  sendResponse(res, {
    data: result,
    message: 'User Registered Successfully',
    statusCode: StatusCodes.CREATED,
    success: true,
  });
});

const login = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await authService.login(payload);
  sendResponse(res, {
    data: result,
    message: 'User Logged in Successfully',
    statusCode: StatusCodes.OK,
    success: true,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  if (!req.user) {
    return sendResponse(res, {
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: 'Unauthorized: User information missing',
      data: null,
    });
  }

  const result = await authService.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password is updated succesfully!',
    data: result,
  });
});

export const authController = {
  register,
  login,
  changePassword,
};