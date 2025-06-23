import { Request, Response, NextFunction } from "express";
import { app } from "../app";
import { AppError } from "../errors/appError";

export class IsAdmin {
  static execute(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.decodedToken;

    if (user.role !== "ADMIN" || !user.role) {
      throw new AppError(
        "You do not have permission to access this resource.",
        403
      );
    }

    next();
  }
}
