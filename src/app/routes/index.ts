import { Router } from "express";

import authrouter from "../modules/auth/auth.router";

const router = Router();

// router.use("/blog", blogRouter )
router.use("/auth", authrouter);

export default router;
