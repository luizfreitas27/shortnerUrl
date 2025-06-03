import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export class HandleErrorsMiddleware {
  static execute(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    if (err instanceof ZodError) {
      const formattedErrors = err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));

      return res.status(400).json({
        message: "Validation error",
        errors: formattedErrors,
      });
    }

    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({ message: err.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}
