import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsValidUrl {
  static execute = async (req: Request, res: Response, next: NextFunction) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      throw new AppError("Original URL is required", 400);
    }

    const url = await prisma.shortnerUrl.findFirst({
      where: {
        originalUrl: originalUrl,
      },
    });

    if (url) {
      throw new AppError("This URL already exists", 400);
    }

    next();
  };
}
