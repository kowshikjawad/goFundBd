import { trpc } from "../config/trpc";
import { campaignRouter } from "../module/Campaigns/campaign.route";
import { categoryRouter } from "../module/Category/category.route";
import { donationRouter } from "../module/Donation/donation.route";
import { userRouter } from "../module/User/user.route";

export const appRouter = trpc.router({
  user: userRouter,
  category: categoryRouter,
  campaign: campaignRouter,
  donation: donationRouter,
});

export type AppRouter = typeof appRouter;
