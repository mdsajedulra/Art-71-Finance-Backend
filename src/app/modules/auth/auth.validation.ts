import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  password: z.string().nonempty("Password is required"),
});

const changePasswordValidationSchema = z.object({
  oldPassword: z.string().nonempty("Old password is required"),
  newPassword: z.string().nonempty("New password is required"),
});

export const authValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
