// transaction.validation.ts
import z from "zod";
import { ExpenseSource, IncomeSource } from "./transaction.interface";

export const transactionSchemaZod = z.object({
  userId: z.string().min(1, "UserId is required"),
  relatedTo: z.string().optional(), // loan/personal এর জন্য
  amount: z.number().positive("Amount must be positive"),
  type: z.enum(["income", "expense", "loan", "personal"]),
  paymentMethod: z.enum(["cash", "bank"]),
  source: z
    .enum([
      ...Object.values(IncomeSource),
      ...Object.values(ExpenseSource),
    ] as [string, ...string[]])
    .optional(), // loan/personal হলে এটা optional
  description: z.string().optional(),
  note: z.string().optional(),
  date: z
    .union([z.string(), z.date()])
    .transform((val) => (typeof val === "string" ? new Date(val) : val)),
});
