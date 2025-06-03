import { Router } from "express";
import { UserController } from "../controllers/user.controllers";
import { IsValidEmail } from "../middlewares/isValidEmail.middleware";
import { SchemaValid } from "../middlewares/schemaValid.middlewares";
import { userCreateSchema } from "../schemas/users.shemas";

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  "/",
  SchemaValid.execute(userCreateSchema),
  IsValidEmail.execute,
  userController.registerUser
);

export { userRouter };
