import { trpc } from "../../../config/trpc";
import { authMiddleware } from "../../../middlewares/authMiddleware";
import { bkashAuthMiddleware } from "../../../middlewares/bkashAuth.middleware";
import { loggerMiddleware } from "../../../middlewares/loggerMiddleware";
import { createBkashPaymentController } from "./bkash.controller";
import { bkashPaymentValidationSchema } from "./bkash.validation";

const trpcProcedure = trpc.procedure
  .use(loggerMiddleware)
  .use(authMiddleware)
  .use(bkashAuthMiddleware);

export const bkashRouter = trpc.router({
  createBkashPayment: trpcProcedure
    .input(bkashPaymentValidationSchema)
    .mutation(({ input, ctx }) => {
      const { id, bkashToken } = ctx;
      const { amount } = input;
      createBkashPaymentController(amount, id, bkashToken);
    }),
});
