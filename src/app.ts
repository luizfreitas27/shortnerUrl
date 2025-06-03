import express, { json } from "express";
import helmet from "helmet";
import "express-async-errors";
import { userRouter } from "./routes/user.router";
import { HandleErrorsMiddleware } from "./middlewares/handleErrors.middlewares";

export const app = express();

app.use(helmet());
app.use(json());
app.use(HandleErrorsMiddleware.execute);
app.use("/user", userRouter);
