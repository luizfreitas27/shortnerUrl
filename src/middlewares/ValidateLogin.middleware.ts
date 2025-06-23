import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userLoginSchema, userSchema } from "../schemas/users.shemas";
import { AppError } from "../errors/appError";

export class ValidateLogin {
  static execute = async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const compare = await bcrypt.compare(req.body.password, user.password);

    if (!compare) {
      throw new AppError("Invalid password", 401);
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h", subject: String(user.id) }
    );

    res.locals.decodedToken = {
      user: userLoginSchema.parse(user),
      token: `Bearer ${accessToken}`,
    };

    next();
  };
}
