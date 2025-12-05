import { z } from "zod";

export const personalDataSchema = z.object({
    fullName: z.string().min(1, { message: "Full name name is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    idNumber: z.string().min(1, { message: "ID is required" }),
});

export type PersonalDataSchemaType = z.infer<typeof personalDataSchema>;