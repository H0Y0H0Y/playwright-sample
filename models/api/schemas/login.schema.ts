import { z } from "zod";

export const successSchema = z.object({
    user: z.object({
        _id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        __v: z.number()
    }),
    token: z.string().min(1, { message: "Token cannot be empty" })
});