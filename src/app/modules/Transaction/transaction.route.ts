import { Router } from "express";
import { transactionSchemaZod } from "./transaction.validation";
import { transactionController } from "./transaction.controller";
import validateRequest from "../../middlewares/validateRequest";

const transactionRouter = Router();

transactionRouter.post(
  "/",
  validateRequest(transactionSchemaZod),
  transactionController.createTransaction
);
transactionRouter.get(
  "/transaction_summary",
  transactionController.getBalanceSummaryAggregate
);
transactionRouter.get(
  "/income_by_source",
  transactionController.getIncomeBySource
);
transactionRouter.get(
  "/expense_by_source",
  transactionController.getExpenseBySource
);
transactionRouter.get(
  "/all_transaction_by_source",
  transactionController.allTransactionBySource
);

export default transactionRouter;
