import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { transactionService } from "./transaction.service";

const createTransaction = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await transactionService.createTransaction(payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    data: result,
    message: "Transaction created successfully",
    success: true,
  });
});

// transaction summary

const getBalanceSummaryAggregate = catchAsync(async (req, res) => {

const result = await transactionService.getBalanceSummaryAggregate();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    data: result,
    message: "Balance summary retrieved successfully",
    success: true,
  });
});

// get income by source

const getIncomeBySource = catchAsync(async (req, res) => {
  const result = await transactionService.getIncomeBySource();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    data: result,
    message: "Income by source retrieved successfully",
    success: true,
  });
});

// get expense by source 

const getExpenseBySource = catchAsync(async (req, res) => {
  const result = await transactionService.getExpenseBySource();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    data: result,
    message: "Expense by source retrieved successfully",
    success: true,
  });
});
// all transaction by source

const allTransactionBySource = catchAsync(async (req, res) => {
  
  const query = req.query;
  // console.log(" source", query);
  const result = await transactionService.getAllTransactions(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    data: result,
    message: "All transactions by source retrieved successfully",
    success: true,
  });
});

export const transactionController = {
  createTransaction,
  getBalanceSummaryAggregate,
  getIncomeBySource,
  getExpenseBySource,
  allTransactionBySource
};
