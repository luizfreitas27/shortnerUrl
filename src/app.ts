import "reflect-metadata";
import express, { json } from "express";
import helmet from "helmet";
import "express-async-errors";
import { userRouter } from "./routes/user.router";
import { HandleErrorsMiddleware } from "./middlewares/handleErrors.middlewares";
import cors from "cors";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use(HandleErrorsMiddleware.execute);
app.use("/api/user", userRouter);
