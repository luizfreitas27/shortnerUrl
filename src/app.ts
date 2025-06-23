import "reflect-metadata";
import express, { json } from "express";
import helmet from "helmet";
import "express-async-errors";
import { userRouter } from "./routes/user.router";
import { HandleErrorsMiddleware } from "./middlewares/handleErrors.middlewares";
import cors from "cors";
import { shortnerUrlRouter } from "./routes/shortnerUrl.router";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use("/api/user", userRouter);
app.use("/", shortnerUrlRouter);
app.use(HandleErrorsMiddleware.execute);
