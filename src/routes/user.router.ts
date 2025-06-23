import { Router } from "express";
import { UserController } from "../controllers/user.controllers";
import { IsValidEmailOrUsername } from "../middlewares/isValidEmail.middleware";
import { SchemaValid } from "../middlewares/schemaValid.middlewares";
import {
  userCreateSchema,
  userLoginValidSchema,
} from "../schemas/users.shemas";
import { ValidateLogin } from "../middlewares/ValidateLogin.middleware";
import { container } from "tsyringe";
import { IsAdmin } from "../middlewares/IsAdmin.middleware";
import { IsvalidToken } from "../middlewares/IsValidToken.middlewares";

const userRouter = Router();
const userController = container.resolve(UserController);

userRouter.post(
  "/signup",
  SchemaValid.execute(userCreateSchema),
  IsValidEmailOrUsername.execute,
  userController.registerUser
);

userRouter.post(
  "/signin",
  SchemaValid.execute(userLoginValidSchema),
  ValidateLogin.execute,
  userController.loginUser
);

userRouter.get("/", IsvalidToken.execute, userController.getUserProfile);

userRouter.get(
  "/profiles",
  IsvalidToken.execute,
  IsAdmin.execute,
  userController.getProfiles
);

export { userRouter };
