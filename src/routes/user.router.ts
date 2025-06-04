import { Router } from "express";
import { UserController } from "../controllers/user.controllers";
import { IsValidEmail } from "../middlewares/isValidEmail.middleware";
import { SchemaValid } from "../middlewares/schemaValid.middlewares";
import {
  userCreateSchema,
  userLoginValidSchema,
} from "../schemas/users.shemas";
import { ValidateLogin } from "../middlewares/ValidateLogin.middleware";
import { container } from "tsyringe";

const userRouter = Router();
const userController = container.resolve(UserController);

userRouter.post(
  "/signup",
  SchemaValid.execute(userCreateSchema),
  IsValidEmail.execute,
  userController.registerUser
);

userRouter.post(
  "/signin",
  SchemaValid.execute(userLoginValidSchema),
  ValidateLogin.execute,
  userController.loginUser
);

export { userRouter };
