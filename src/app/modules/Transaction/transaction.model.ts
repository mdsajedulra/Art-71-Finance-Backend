import { model, Schema } from "mongoose";
import { ITransaction } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    relatedTo: { type: Schema.Types.ObjectId, ref: "User" }, // optional
    amount: { type: Number, required: true, min: 1 },
    type: {
      type: String,
      enum: ["income", "expense", "loan", "personal"],
      required: true,
    },
    paymentMethod: { type: String, enum: ["cash", "bank"], required: true },
    source: { type: String }, // income/expense হলে required হবে, loan/personal এ optional
    description: { type: String },
    note: { type: String },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const TransactionModel = model<ITransaction>(
  "Transaction",
  transactionSchema
);
