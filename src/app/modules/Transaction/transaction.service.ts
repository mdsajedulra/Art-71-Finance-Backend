import { queryBuilder } from "../../builder/queryBuilder";
import { ITransaction } from "./transaction.interface";
import { TransactionModel } from "./transaction.model";

const createTransaction = async (payload: ITransaction) => {
  const result = await TransactionModel.aggregate([
    {
      $group: {
        _id: "$paymentMethod",
        totalIncome: {
          $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
        },
        totalExpense: {
          $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
        },
      },
    },
  ]);

  // Initialize summary
  let bankBalance = 0;
  let cashBalance = 0;
  let totalIncome = 0;
  let totalExpense = 0;

  // Map aggregate result to clean summary
  result.forEach((r) => {
    const balance = r.totalIncome - r.totalExpense;
    if (r._id === "bank") bankBalance = balance;
    if (r._id === "cash") cashBalance = balance;

    totalIncome += r.totalIncome;
    totalExpense += r.totalExpense;
  });

  if (
    payload.type === "expense" &&
    payload.paymentMethod === "bank" &&
    bankBalance < payload.amount
  ) {
    throw new Error("Insufficient bank balance");
  }

  if (
    payload.type === "expense" &&
    payload.paymentMethod === "cash" &&
    cashBalance < payload.amount
  ) {
    throw new Error("Insufficient cash balance");
  }

  return await TransactionModel.create(payload);
};

// Get balance summary

const getBalanceSummaryAggregate = async () => {
  const result = await TransactionModel.aggregate([
    { $match: {} },
    {
      $group: {
        _id: "$paymentMethod",
        totalIncome: {
          $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
        },
        totalExpense: {
          $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
        },
      },
    },
  ]);

  // Initialize summary
  let bankBalance = 0;
  let cashBalance = 0;

  let totalIncome = 0;
  let totalExpense = 0;

  // Map aggregate result to clean summary
  result.forEach((r) => {
    const balance = r.totalIncome - r.totalExpense;
    if (r._id === "bank") bankBalance = balance;
    if (r._id === "cash") cashBalance = balance;

    totalIncome += r.totalIncome;
    totalExpense += r.totalExpense;
  });

  return {
    totalIncome,
    totalExpense,
    totalBalance: bankBalance + cashBalance,
    bankBalance,
    cashBalance,
  };
};

// get income by source

const getIncomeBySource = async ({ date }: { date: any }) => {
  const result = await TransactionModel.aggregate([
    {
      $match: { type: "income", date },
    },
    {
      $group: { _id: "$source", totalIncome: { $sum: "$amount" } },
    },
  ]);

  return result;
};

// get expense by source

const getExpenseBySource = async ({ date }: { date: any }) => {
  const result = await TransactionModel.aggregate([
    {
      $match: { type: "expense", date },
    },
    {
      $group: {
        _id: "$source",
        totalExpense: { $sum: "$amount" },
      },
    },
  ]);

  return result;
};

// get balance summary aggregate all

const getBalanceSummaryAggregateAll = async () => {
  const result = await TransactionModel.aggregate([
    {
      $group: {
        _id: "$paymentMethod",
        totalIncome: {
          $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
        },
        totalExpense: {
          $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
        },
      },
    },
  ]);

  // Initialize summary
  let bankBalance = 0;
  let cashBalance = 0;

  let totalIncome = 0;
  let totalExpense = 0;

  // Map aggregate result to clean summary
  result.forEach((r) => {
    const balance = r.totalIncome - r.totalExpense;
    if (r._id === "bank") bankBalance = balance;
    if (r._id === "cash") cashBalance = balance;

    totalIncome += r.totalIncome;
    totalExpense += r.totalExpense;
  });

  return {
    remainingBalance: bankBalance + cashBalance,
    bankBalance,
    cashBalance,
    totalExpense,
    totalIncome,
  };
};

// get balance summary by date range

const getBalanceSummary = async ({ date }: { date: any }) => {
  const result = await TransactionModel.aggregate([
    { $match: { date } },
    {
      $group: {
        _id: "$paymentMethod",
        totalIncome: {
          $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
        },
        totalExpense: {
          $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
        },
      },
    },
  ]);

  // Initialize summary
  let bankBalance = 0;
  let cashBalance = 0;

  let totalIncome = 0;
  let totalExpense = 0;

  // Map aggregate result to clean summary
  result.forEach((r) => {
    const balance = r.totalIncome - r.totalExpense;
    if (r._id === "bank") bankBalance = balance;
    if (r._id === "cash") cashBalance = balance;

    totalIncome += r.totalIncome;
    totalExpense += r.totalExpense;
  });

  return {
    totalIncome,
    totalExpense,
    totalBalance: bankBalance + cashBalance,
    bankBalance,
    cashBalance,
  };
};

const getAllTransactions = async (query: any) => {
  // console.log(query.range);
  const { start, end } = queryBuilder(
    query.range,
    query.startDate,
    query.endDate
  );

  // console.log(start, end);
  // all transactions in date range
  const transactions = await TransactionModel.find({
    $or: [{ date: { $gte: start, $lte: end } }],
  }).sort({ date: -1 });
  // balance summary in date range
  const summary = await getBalanceSummary({ date: { $gte: start, $lte: end } });

  // income by source in date range
  const incomeBySource = await getIncomeBySource({
    date: { $gte: start, $lte: end },
  });

  // expense by source in date range
  const expenseBySource = await getExpenseBySource({
    date: { $gte: start, $lte: end },
  });
  // overall balance summary
  const balanceSummaryAggregateAll = await getBalanceSummaryAggregateAll();
  return {
    summary,
    transactions,
    incomeBySource,
    expenseBySource,
    overAll: {
      remainingBalance: balanceSummaryAggregateAll.remainingBalance,
      bankBalance: balanceSummaryAggregateAll.bankBalance,
      cashBalance: balanceSummaryAggregateAll.cashBalance,
      totalExpense: balanceSummaryAggregateAll.totalExpense,
      totalIncome: balanceSummaryAggregateAll.totalIncome,
    },
  };
};

export const transactionService = {
  createTransaction,
  getBalanceSummaryAggregate,
  getIncomeBySource,
  getExpenseBySource,
  getAllTransactions,
};
