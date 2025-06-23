import { injectable } from "tsyringe";
import { z } from "zod";
import { prisma } from "../database/prisma";
import {
  UserCreateSchema,
  UserResponseLoginSchema,
  userCreateResponseSchema,
  UserCreateResponseSchema,
  userGetProfileResponseSchema,
} from "../schemas/users.shemas";
import bcrypt from "bcrypt";

@injectable()
export class UserService {
  public registerUser = async (
    payload: UserCreateSchema
  ): Promise<UserCreateResponseSchema> => {
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

  public getUserProfile = async (
    id: number
  ): Promise<userGetProfileResponseSchema> => {
    const response = await prisma.user.findFirst({
      where: { id },
      include: { shortnerUrls: true },
    });

    return userGetProfileResponseSchema.parse(response);
  };

  public getProfiles = async () => {
    const response = await prisma.user.findMany();

    return z.array(userCreateResponseSchema).parse(response);
  };
}
