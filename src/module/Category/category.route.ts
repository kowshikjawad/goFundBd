import { trpc } from "../../config/trpc";
import { loggerMiddleware } from "../../middlewares/loggerMiddleware";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryByIdController,
  getCategoryController,
  updateCategoryController,
} from "./category.controller";
import {
  categoryIdSchema,
  categoryNameSchema,
  categoryUpdateSchema,
} from "./category.validation";

// Middleware for all procedures
const trpcProcedure = trpc.procedure.use(loggerMiddleware);

// Category Router
export const categoryRouter = trpc.router({
  createCategory: trpcProcedure
    .input(categoryNameSchema)
    .mutation(({ input }) => createCategoryController(input.name)),

  updateCategory: trpcProcedure
    .input(categoryUpdateSchema)
    .mutation(({ input }) => updateCategoryController(input.id, input.name)),

  deleteCategory: trpcProcedure
    .input(categoryIdSchema)
    .mutation(({ input }) => deleteCategoryController(input.id)),

  getAllCategories: trpcProcedure.query(() => getCategoryController()),

  getCategoryById: trpcProcedure
    .input(categoryIdSchema)
    .mutation(({ input }) => getCategoryByIdController(input.id)),
});
