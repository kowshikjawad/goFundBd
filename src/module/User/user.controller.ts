import { TRPCError } from "@trpc/server";
import { errorResponse, successResponse } from "../../utils/httpResponse";
import {
  createUserService,
  currentUserService,
  getUserService,
  userLoginService,
} from "./user.service";
import { TAuthContext, TCreateUserInput, TLoginUserInput } from "./user.types";

export const createUserController = async (input: TCreateUserInput) => {
  try {
    const user = await createUserService(input);
    return successResponse(user, 201);
  } catch (error) {
    const trpcError = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
    return errorResponse(error, trpcError);
  }
};

export const userLoginController = async (input: TLoginUserInput) => {
  try {
    const user = await userLoginService(input);
    return successResponse(user, 200);
  } catch (error) {
    const trpcError = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
    return errorResponse(error, trpcError);
  }
};

export const getUsersController = async () => {
  try {
    const users = await getUserService();
    return successResponse(users, 200);
  } catch (error) {
    const trpcError = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
    return errorResponse(error, trpcError);
  }
};

export const currentUserController = async (ctx: TAuthContext) => {
  if (!ctx?.id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated.",
    });
  }

  try {
    const user = await currentUserService(ctx);
    return successResponse(user, 200);
  } catch (error) {
    const trpcError = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
    return errorResponse(error, trpcError);
  }
};

const userController = {
  createUserController,
  userLoginController,
  getUsersController,
  currentUserController,
};

export default userController;
