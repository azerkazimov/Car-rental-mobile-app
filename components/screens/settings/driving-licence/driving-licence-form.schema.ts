import { z } from "zod";

export const drivingLicenceSchema = z.object({
  licenceNumber: z
    .string()
    .min(1, "Licence number is required")
    .min(5, "Licence number must be at least 5 characters"),
  expiryDate: z
    .string()
    .min(1, "Expiry date is required")
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format"),
  licencePhoto: z
    .string()
    .nullable()
    .optional(),
});

export type DrivingLicenceSchemaType = z.infer<typeof drivingLicenceSchema>;

