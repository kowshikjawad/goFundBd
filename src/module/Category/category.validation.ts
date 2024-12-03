// Reusable Zod Schemas
import { z } from "zod";

export const categoryIdSchema = z.object({ id: z.string() });
export const categoryNameSchema = z.object({ name: z.string() });
export const categoryUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const categoryValidationSchemas = {
  categoryIdSchema,
  categoryNameSchema,
  categoryUpdateSchema,
};
