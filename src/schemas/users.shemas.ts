import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  email: z.string().email(),
  username: z.string().nonempty(),
  password: z.string().min(5).max(15),
  role: z.enum(["USER", "ADMIN"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),

  shortnerUrls: z.array(
    z.object({
      id: z.number().positive(),
      originalUrl: z.string().url(),
      shortnerUrl: z.string().url(),
      code: z.string().min(1).max(8),
      count: z.number().int().nonnegative(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});

export const userLoginValidSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});

export const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  shortnerUrls: true,
});

export const userCreateResponseSchema = userSchema.omit({
  id: true,
  password: true,
  role: true,
  createdAt: true,
  updatedAt: true,
  shortnerUrls: true,
});

export const userLoginSchema = userSchema.omit({
  id: true,
  password: true,
  createdAt: true,
  updatedAt: true,
  shortnerUrls: true,
});

export const userResponseLoginSchema = z.object({
  user: userSchema.omit({
    password: true,
    createdAt: true,
    updatedAt: true,
  }),
  token: z.string().nonempty(),
});

export const userUrlsSchema = userSchema.pick({
  username: true,
  shortnerUrls: true,
});

export const userGetProfileResponseSchema = userSchema.pick({
  username: true,
  shortnerUrls: true,
});

export type UserLoginValidSchema = z.infer<typeof userLoginValidSchema>;
export type UserResponseLoginSchema = z.infer<typeof userResponseLoginSchema>;
export type UserSchema = z.infer<typeof userSchema>;
export type UserCreateSchema = z.infer<typeof userCreateSchema>;
export type UserCreateResponseSchema = z.infer<typeof userCreateResponseSchema>;
export type userUrlsSchema = z.infer<typeof userUrlsSchema>;
export type userGetProfileResponseSchema = z.infer<
  typeof userGetProfileResponseSchema
>;
