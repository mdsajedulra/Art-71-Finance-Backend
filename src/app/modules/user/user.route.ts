import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import auth from '../../middlewares/auth';


const userRoute = Router();

userRoute.post(
  '/register',
  validateRequest(userValidation.UserSchema),
  userController.createUser,
);

userRoute.get('/', userController.getAllUser);
userRoute.patch('/:userId', auth('admin'), userController.blockUser);
userRoute.get('/', userController.getAllUser);

export default userRoute;