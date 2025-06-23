import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";

export class IsvalidToken {
  static execute(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError("Missing authorization header", 401);
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      throw new AppError("Invalid authorization format", 401);
    }

    if (token.length < 10) {
      throw new AppError("Invalid token", 401);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    res.locals.decodedToken = decodedToken;

    return next();
  }
}
