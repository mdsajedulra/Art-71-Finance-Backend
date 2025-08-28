import { Router } from "express";
import { blogRouter } from "../modules/blog/blog.route";

const router = Router()

router.use("/blog", blogRouter )



export default router