// Reusable Zod Schemas
import { z } from "zod";

const categoryIdSchema = z.object({ id: z.string() });
const categoryNameSchema = z.object({ name: z.string() });
const categoryUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const categoryValidationSchemas = {
  categoryIdSchema,
  categoryNameSchema,
  categoryUpdateSchema,
};
