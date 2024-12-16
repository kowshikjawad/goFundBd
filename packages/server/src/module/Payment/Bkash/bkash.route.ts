import { trpc } from "../../../config/trpc";
import { bkashAuthMiddleware } from "../../../middlewares/bkashAuth.middleware";
import { loggerMiddleware } from "../../../middlewares/loggerMiddleware";
import {
  callbackBkashPaymentController,
  createBkashPaymentController,
} from "./bkash.controller";
import { bkashPaymentValidationSchema } from "./bkash.validation";

const trpcProcedure = trpc.procedure
  .use(loggerMiddleware)
  .use(bkashAuthMiddleware);

export const bkashRouter = trpc.router({
  createBkashPayment: trpcProcedure
    .input(bkashPaymentValidationSchema)
    .mutation(({ input, ctx }) => {
      const { bkashToken } = ctx;
      const { amount, donation_id } = input;
      const result = createBkashPaymentController(
        amount,
        bkashToken,
        donation_id
      );
      return result;
    }),
  callBack: trpcProcedure.query(({ ctx }) => {
    const { req, res, bkashToken } = ctx;

    const { paymentID, status } = req.query as {
      paymentID: string;
      status: string;
    };
    const result = callbackBkashPaymentController(
      paymentID,
      status,
      res,
      bkashToken
    );
    return result;
  }),
});
