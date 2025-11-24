import { z } from "zod";

export const paymentFormSchema = z.object({
  cardNumber: z.string().min(16, { message: "Card number is required" }),
  cardHolder: z.string().min(1, { message: "Card holder is required" }),
  cardExpiration: z.string().min(1, { message: "Card expiration is required" }),
  cardCvv: z.string().min(3, { message: "Card CVV is required" }),
});

export type PaymentFormSchema = z.infer<typeof paymentFormSchema>;