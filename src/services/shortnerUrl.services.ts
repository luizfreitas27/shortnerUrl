import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import {
  CreateShortnerUrlResponseSchema,
  createShortnerUrlResponseSchema,
  CreateShortnerUrlSchema,
  GetOneRedirectShortnerUrlSchema,
  getOneRedirectShortnerUrlSchema,
} from "../schemas/shortnerUrl.schemas";
import { nanoid } from "nanoid";
import { AppError } from "../errors/appError";

@injectable()
export class ShortnerUrlServices {
  public async create(
    id: number,
    payload: CreateShortnerUrlSchema
  ): Promise<CreateShortnerUrlResponseSchema> {
    const shortnerId = nanoid(8);

    const data = {
      ...payload,
      code: shortnerId,
      shortnerUrl: `${process.env.BASE_URL}/${shortnerId}`,
      userId: id,
    };

    const response = await prisma.shortnerUrl.create({ data: data });

    return createShortnerUrlResponseSchema.parse(response);
  }

  public get = async (
    code: string
  ): Promise<GetOneRedirectShortnerUrlSchema> => {
    const result = await prisma.shortnerUrl.findFirst({
      where: {
        code: code,
      },
    });

    if (!result) {
      throw new AppError("Shortner URL not found", 404);
    } else {
      await prisma.shortnerUrl.update({
        where: { id: result.id },
        data: { count: result.count + 1, updatedAt: new Date() },
      });
    }

    return getOneRedirectShortnerUrlSchema.parse(result);
  };
}
