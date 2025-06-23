import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ShortnerUrlServices } from "../services/shortnerUrl.services";
import { AppError } from "../errors/appError";

@injectable()
export class ShortnerUrlController {
  constructor(
    @inject(ShortnerUrlServices) private shortnerUrlService: ShortnerUrlServices
  ) {}

  public create = async (req: Request, res: Response) => {
    try {
      const response = await this.shortnerUrlService.create(
        res.locals.decodedToken.id,
        req.body
      );
      return res.status(200).json(response);
    } catch (error) {
      console.error({ message: error });
    }
  };

  public get = async (req: Request, res: Response) => {
    try {
      const { code } = req.params;

      const result = await this.shortnerUrlService.get(code);

      return res.status(200).redirect(result.originalUrl);
    } catch (error) {
      console.error({ message: error });
    }
  };
}
