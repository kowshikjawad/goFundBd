// Reusable Zod Schemas

import { z } from "zod";

const roleEnum = z.enum(["Donor", "CampaignOwner", "Admin"]);

export const createUserValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: roleEnum,
});

export const loginUserValidationSchema = z.object({
  email: z.string().email("Invalid email."),
  password: z.string().min(1, "Password is required."),
});

export const userValidationSchemas = {
  createUserValidationSchema,
  loginUserValidationSchema,
};
