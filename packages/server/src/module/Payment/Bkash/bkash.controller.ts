import { TRPCError } from "@trpc/server";
import { errorResponse, successResponse } from "../../../utils/httpResponse";
import {
  createBkashPaymentService,
  getBkashPaymentService,
} from "./bkash.service";

export const createBkashPaymentController = async (
  amount: string,
  bkashToken: string
) => {
  try {
    const paymentBkash = await createBkashPaymentService(amount, bkashToken);
    return successResponse(paymentBkash, 201);
  } catch (error) {
    console.log(error);
    const trpcError = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
    return errorResponse(error, trpcError);
  }
};

export const getBkashPaymentController = async () => {
  try {
    const paymentBkash = await getBkashPaymentService();
    return successResponse(paymentBkash, 200);
  } catch (error) {
    console.log(error);
    const trpcError = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
    return errorResponse(error, trpcError);
  }
};

export const callbackBkashPaymentController = async (
  paymentId: string,
  status: string
) => {};

const bkashPaymentController = {
  createBkashPaymentController,
  getBkashPaymentController,
  callbackBkashPaymentController,
};

export default bkashPaymentController;
