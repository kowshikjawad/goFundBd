import { TRPCError } from "@trpc/server";
import { errorResponse, successResponse } from "../../../utils/httpResponse";
import { createBkashPaymentService } from "./bkash.service";

// const paymentRouter = router({
//   createPayment: publicProcedure
//     .input(
//       z.object({
//         amount: z.string(),
//         userId: z.string(),
//       })
//     )
//     .mutation(async ({ input }) => {
//       const { amount, userId } = input;
//       globals.set("userId", userId);
//       const data = await paymentService.createPayment(amount);
//       return { bkashURL: data.bkashURL };
//     }),

//   callback: publicProcedure
//     .input(
//       z.object({
//         paymentID: z.string(),
//         status: z.string(),
//       })
//     )
//     .mutation(async ({ input }) => {
//       const { paymentID, status } = input;

//       if (status === "cancel" || status === "failure") {
//         throw new Error(`http://localhost:5173/error?message=${status}`);
//       }

//       if (status === "success") {
//         const data = await paymentService.executePayment(paymentID);

//         if (data && data.statusCode === "0000") {
//           const userId = globals.get("userId");
//           await paymentService.savePayment(
//             userId,
//             paymentID,
//             data.trxID,
//             data.paymentExecuteTime,
//             data.amount
//           );
//           return { redirect: `http://localhost:5173/success` };
//         }

//         throw new Error(`http://localhost:5173/error?message=${data.statusMessage}`);
//       }
//     }),

//   refund: publicProcedure
//     .input(
//       z.object({
//         trxID: z.string(),
//       })
//     )
//     .mutation(async ({ input }) => {
//       const { trxID } = input;

//       const payment = await paymentService.findPaymentByTrxID(trxID);
//       if (!payment) {
//         throw new Error("Refund failed: Payment not found");
//       }

//       const data = await paymentService.refundTransaction(payment, trxID);

//       if (data && data.statusCode === "0000") {
//         return { message: "Refund successful" };
//       }

//       throw new Error("Refund failed: Transaction error");
//     }),
// });

// module.exports = paymentRouter;

export const createBkashPaymentController = async (
  amount: string,
  bkashToken: string
) => {
  try {
    const paymentBkash = await createBkashPaymentService(amount, bkashToken);
    return successResponse({ paymentBkash }, 201);
  } catch (error) {
    console.log(error);
    const trpcError = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
    return errorResponse(error, trpcError);
  }
};

const bkashPaymentController = {
  createBkashPaymentController,
};

export default bkashPaymentController;
