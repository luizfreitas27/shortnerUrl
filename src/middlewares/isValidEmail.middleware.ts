import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsValidEmailOrUsername {
  static execute = async (req: Request, res: Response, next: NextFunction) => {
    const { email, username } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (user?.email === email) {
      throw new AppError("Email already exists", 400);
    }

    if (user?.username === username) {
      throw new AppError("Username already exists", 400);
    }

    res.locals = { ...res.locals, user };

    next();
  };
}
