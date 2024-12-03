import { z } from "zod";

export const createDonationValidationSchema = z.object({
  amount: z.number().positive(),
  donation_date: z.date().optional(),
  campaign_id: z.string().uuid(),
});

export const inputIdSchema = z.object({ id: z.string() });

export const donationValidationSchema = {
  createDonationValidationSchema,
  inputIdSchema,
};
