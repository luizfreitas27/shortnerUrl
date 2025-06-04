import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import {
  UserCreateSchema,
  UserResponseLoginSchema,
  userCreateResponseSchema,
  UserResponseSchema,
  UserSchema,
} from "../schemas/users.shemas";
import bcrypt from "bcrypt";

@injectable()
export class UserService {
  public registerUser = async (
    payload: UserCreateSchema
  ): Promise<UserResponseSchema> => {
    const hashPassword = await bcrypt.hash(payload.password, 10);

    const newUser = {
      ...payload,
      password: hashPassword,
    };

    const response = await prisma.user.create({ data: newUser });

    return userCreateResponseSchema.parse(response);
  };

  public loginUser = async (payload: UserResponseLoginSchema) => {
    return payload;
  };
}
