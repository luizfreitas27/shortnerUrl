import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  email: z.string().email(),
  username: z.string().nonempty(),
  password: z.string().min(5).max(15),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const userResponseSchema = userSchema.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
});

export type UserSchema = z.infer<typeof userSchema>;
export type UserCreateSchema = z.infer<typeof userCreateSchema>;
export type UserResponseSchema = z.infer<typeof userResponseSchema>;
