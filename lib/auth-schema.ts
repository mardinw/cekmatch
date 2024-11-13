import { z } from "zod";

export const signFormSchema = z.object({
    username: z
        .string()
        .min(2, {message: 'Name must be at least 2 character long'})
        .max(50, {message: 'Name cannot exceed 50 characters'}),
    password: z
        .string()
        .min(8, {message: 'Password must be at least 8 character long'})
        .max(50, {message: 'Password cannot exceed 50 characters'}),
});

export const signInFormSchema = signFormSchema.pick({
    username: true,
    password: true,
});