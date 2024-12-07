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

const errorPropertiesSchema = z.object({
    message: z.string(),
    type: z.string(),
    path: z.string(),
    value: z.string()
});

const errorDetailsSchema = z.object({
    name: z.string(),
    message: z.string(),
    properties: errorPropertiesSchema,
    kind: z.string(),
    path: z.string(),
    value: z.string()
});

export const errorSchema = z.object({
    firstName: errorDetailsSchema.optional(),
    lastName: errorDetailsSchema.optional(),
    email: errorDetailsSchema.optional(),
    password: errorDetailsSchema.optional()
});

export const emailExistsSchema = z.object({
    message: z.string()
});