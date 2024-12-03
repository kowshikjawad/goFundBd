import { z } from "zod";
import { createDonationValidationSchema } from "./donation.validation";

export type TDonation = {
  id?: string;
  amount: number;
  donation_date: Date;
  campaign_id: string;
  user_id: string;
};

export type TCreateDonation = z.infer<typeof createDonationValidationSchema>;
