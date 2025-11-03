import { Types } from "mongoose";

// Income sources
export enum IncomeSource {
  YouTube = "YouTube",
  Agency = "Agency",
  Course = "Course",
}

// Expense sources
export enum ExpenseSource {
  Salary = "Salary",
  Office = "Office",
  Food = "Food",
  Invest = "Invest",
  AdRun = "Ad Run",
  Other = "Other",
}

// Transaction type
export type TransactionType = "income" | "expense" | "loan" | "personal";

// Transaction interface
export interface ITransaction {
  userId?: Types.ObjectId; // Founder/member/user ID
  amount: number;
  type: TransactionType; // এখন income | expense | loan | personal
  paymentMethod: "cash" | "bank";
  source?: IncomeSource | ExpenseSource;
  relatedTo?: Types.ObjectId; // loan বা personal হলে যার সাথে সম্পর্কিত তার userId/storeId
  description?: string;
  note?: string;
  date: Date;
}
