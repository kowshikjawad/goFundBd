import { trpc } from "../../config/trpc";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { loggerMiddleware } from "../../middlewares/loggerMiddleware";
import {
  createCampaignController,
  deleteCampaignController,
  getAllCampaignsController,
  getCampaignByIdController,
  getCampaignByOwnerController,
  updateCampaignController,
} from "./campaign.controller";
import {
  campaignUpdateValidationSchema,
  createCampaignValidationSchema,
  inputIdSchema,
} from "./campaign.validation";

const trpcPrivateProcedure = trpc.procedure
  .use(loggerMiddleware)
  .use(authMiddleware);
const trpcPublicProcedure = trpc.procedure.use(loggerMiddleware);

export const campaignRouter = trpc.router({
  createCampaign: trpcPrivateProcedure
    .input(createCampaignValidationSchema)
    .mutation(({ ctx, input }) => createCampaignController(input, ctx.id)),

  getAllCampaign: trpcPublicProcedure.query(() => getAllCampaignsController()),

  getCampaignById: trpcPrivateProcedure
    .input(inputIdSchema)
    .query(({ input }) => getCampaignByIdController(input.id)),

  getCampaignByOwner: trpcPrivateProcedure
    .input(inputIdSchema)
    .query(({ input }) => getCampaignByOwnerController(input.id)),

  updateCampaign: trpcPrivateProcedure
    .input(campaignUpdateValidationSchema)
    .mutation(({ input }) => updateCampaignController(input)),

  deleteCampaign: trpcPrivateProcedure
    .input(inputIdSchema)
    .mutation(({ input }) => deleteCampaignController(input.id)),
});
