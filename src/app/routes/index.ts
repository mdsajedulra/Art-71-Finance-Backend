import { Router } from "express";

import authrouter from "../modules/auth/auth.router";
import transactionRouter from "../modules/Transaction/transaction.route";




const router = Router();

// router.use("/blog", blogRouter )
router.use("/auth", authrouter);
router.use("/transaction", transactionRouter);

export default router;
