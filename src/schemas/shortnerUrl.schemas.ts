import { z } from "zod";

export const shortnerUrlSchema = z.object({
  id: z.number(),
  originalUrl: z.string().url(),
  shortnerUrl: z.string().url(),
  code: z.string().min(1).max(8),
  count: z.number().int().nonnegative(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  userId: z.number().int().nonnegative(),
});

export const createShortnerUrlSchema = shortnerUrlSchema.omit({
  id: true,
  shortnerUrl: true,
  code: true,
  count: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export const createShortnerUrlResponseSchema = shortnerUrlSchema.pick({
  shortnerUrl: true,
});

export const getAllShortnerUrlSchema = shortnerUrlSchema.pick({
  originalUrl: true,
  shortnerUrl: true,
  code: true,
});

export const getOneRedirectShortnerUrlSchema = getAllShortnerUrlSchema.pick({
  originalUrl: true,
});

export type ShortnerUrlSchema = z.infer<typeof shortnerUrlSchema>;
export type CreateShortnerUrlSchema = z.infer<typeof createShortnerUrlSchema>;
export type CreateShortnerUrlResponseSchema = z.infer<
  typeof createShortnerUrlResponseSchema
>;

export type GetOneRedirectShortnerUrlSchema = z.infer<
  typeof getOneRedirectShortnerUrlSchema
>;
