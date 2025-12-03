import { z } from "zod";

export const paymentFormSchema = z.object({
  cardNumber: z
    .string()
    .min(1, { message: "Card number is required" })
    .regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, {
      message: "Please enter a valid 16-digit card number",
    }),
  cardHolder: z
    .string()
    .min(1, { message: "Card holder name is required" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Card holder name must contain only letters",
    }),
  expiry: z
    .string()
    .min(1, { message: "Expiry date is required" })
    .regex(/^\d{2}\/\d{2}$/, {
      message: "Please enter a valid expiry date (MM/YY)",
    }),
  cvv: z
    .string()
    .min(3, { message: "CVV must be at least 3 digits" })
    .max(4, { message: "CVV must be at most 4 digits" })
    .regex(/^\d{3,4}$/, { message: "CVV must contain only numbers" }),
});

export type PaymentFormSchema = z.infer<typeof paymentFormSchema>;