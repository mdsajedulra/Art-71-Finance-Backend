export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "accountant";
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
