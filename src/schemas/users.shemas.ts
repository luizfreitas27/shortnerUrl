import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  email: z.string().email(),
  username: z.string().nonempty(),
  password: z.string().min(5).max(15),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const userLoginValidSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});

export const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const userCreateResponseSchema = userSchema.omit({
  id: true,
  password: true,
  createdAt: true,
  updatedAt: true,
});

export const userLoginSchema = userSchema.omit({
  id: true,
  password: true,
  createdAt: true,
  updatedAt: true,
});

export const userResponseLoginSchema = z.object({
  user: userSchema.omit({
    password: true,
    createdAt: true,
    updatedAt: true,
  }),
  token: z.string().nonempty(),
});

export type UserLoginValidSchema = z.infer<typeof userLoginValidSchema>;
export type UserResponseLoginSchema = z.infer<typeof userResponseLoginSchema>;
export type UserSchema = z.infer<typeof userSchema>;
export type UserCreateSchema = z.infer<typeof userCreateSchema>;
export type UserResponseSchema = z.infer<typeof userCreateResponseSchema>;
