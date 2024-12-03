import { z } from "zod";

export const CampaignStatusEnum = z.enum(["Pending", "Active", "Completed"]);

export const inputIdSchema = z.object({ id: z.string() });

export const createCampaignValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  goalAmount: z.number().positive("Goal amount must be a positive number"),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid end date",
  }),
  categoryId: z.string().min(1, "Category ID is required"),
  raisedAmount: z.number().optional().default(0), // Default to 0 if not provided
  status: CampaignStatusEnum.default("Active"),
});

export const campaignUpdateValidationSchema = z.object({
  campaignId: z.string().min(1, "Campaign ID is required"),
  title: z.string().optional(),
  description: z.string().optional(),
  goalAmount: z
    .number()
    .positive("Goal amount must be a positive number")
    .optional(),
  status: CampaignStatusEnum.optional(),
  endDate: z
    .string()
    .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), {
      message: "Invalid end date",
    }),
});

export const campaignFilterValidationSchema = z.object({
  status: CampaignStatusEnum.optional(),
  categoryId: z.string().optional(),
});

export const campaignValidationSchemas = {
  inputIdSchema,
  createCampaignValidationSchema,
  campaignUpdateValidationSchema,
  campaignFilterValidationSchema,
};
