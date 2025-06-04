import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export class SchemaValid {
  static execute = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = schema.parse(req.body);
        next();
      } catch (err) {
        if (err instanceof ZodError) {
          return res.status(400).json({ error: err.errors });
        }
        next(err);
      }
    };
  };
}
