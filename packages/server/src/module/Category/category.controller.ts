import { TRPCError } from "@trpc/server";
import { errorResponse, successResponse } from "../../utils/httpResponse";
import {
  createCategoryService,
  deleteCategoryService,
  getCategoryByIdService,
  getCategoryService,
  updateCategoryService,
} from "./category.service";

export const createCategoryController = async (name: string) => {
  try {
    const category = await createCategoryService(name);
    return successResponse(category, 201);
  } catch (error) {
    console.log(error);
    const trpcError = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
    return errorResponse(error, trpcError);
  }
};

export const getCategoryController = async () => {
  try {
    const category = await getCategoryService();
    return successResponse(category, 200);
  } catch (error) {
    const trpcError = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
    return errorResponse(error, trpcError);
  }
};

export const getCategoryByIdController = async (id: string) => {
  try {
    const category = await getCategoryByIdService(id);
    return successResponse(category, 200);
  } catch (error) {
    const trpcError = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
    return errorResponse(error, trpcError);
  }
};

export const updateCategoryController = async (id: string, name: string) => {
  try {
    const category = await updateCategoryService(id, name);
    return successResponse(category, 204, "Category updated successfully.");
  } catch (error) {
    const trpcError = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
    return errorResponse(error, trpcError);
  }
};

export const deleteCategoryController = async (id: string) => {
  try {
    const category = await deleteCategoryService(id);
    console.log(category);
    return successResponse(category, 204, "Category deleted successfully.");
  } catch (error) {
    const trpcError = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
    return errorResponse(error, trpcError);
  }
};

const categoryController = {
  createCategoryController,
  getCategoryController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
};

export default categoryController;
