import { z } from "zod";

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

export const addContactErrorSchema = z.object({
    firstName: errorDetailsSchema.optional(),
    lastName: errorDetailsSchema.optional(),
    email: errorDetailsSchema.optional(),
    birthdate: errorDetailsSchema.optional()
});

export const successSchema = z.object({
    _id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    birthdate: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    street1: z.string().optional(),
    street2: z.string().optional(),
    city: z.string().optional(),
    stateProvince: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    owner: z.string().optional(),
    __v: z.number()
});