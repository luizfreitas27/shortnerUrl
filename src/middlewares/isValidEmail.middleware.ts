import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";

export class IsValidEmail {
  static execute = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    res.locals = { ...res.locals, user };

    next();
  };
}
