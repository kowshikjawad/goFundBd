import { trpc } from "../../config/trpc";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { loggerMiddleware } from "../../middlewares/loggerMiddleware";
import {
  createDonationController,
  getUserDonationsController,
} from "./donation.controller";
import { createDonationValidationSchema } from "./donation.validation";

const trpcProcedure = trpc.procedure.use(loggerMiddleware).use(authMiddleware);

export const donationRouter = trpc.router({
  createDonation: trpcProcedure
    .input(createDonationValidationSchema)
    .mutation(({ input, ctx }) => createDonationController(input, ctx.id)),

  getUserDonations: trpcProcedure.query(({ ctx }) =>
    getUserDonationsController(ctx.id)
  ),
});
