import express, { Application, Request, Response } from "express";

import cors from "cors";
import router from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/NotFound";

const app: Application = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://art71-finance-font-end.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Welcome to Blog Api" });
});

// unknown route error handle

app.use(globalErrorHandler);
app.use(notFound);

export default app;
