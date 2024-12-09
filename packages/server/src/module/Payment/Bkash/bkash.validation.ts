import { z } from "zod";

export const bkashPaymentValidationSchema = z.object({
  amount: z.string(),
  donation_id: z.string(),
});

export const bkashValidationSchema = {
  bkashPaymentValidationSchema,
};
