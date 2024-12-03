import { z } from "zod";
import {
  campaignUpdateValidationSchema,
  createCampaignValidationSchema,
} from "./campaign.validation";

type CampaignStatus = "Pending" | "Active" | "Completed";

export type TCampaign = {
  title: string;
  description: string;
  goal_amount: number;
  raised_amount: number;
  status: CampaignStatus;
  start_date: Date;
  end_date: Date;
  category_id: string;
  owner_id: string;
};

export type TCreateCampaign = z.infer<typeof createCampaignValidationSchema>;
export type TUpdateCampaign = z.infer<typeof campaignUpdateValidationSchema>;
