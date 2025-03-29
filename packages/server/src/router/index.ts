import { trpc } from "../config/trpc";
import { campaignRouter } from "../module/Campaigns/campaign.route";
import { categoryRouter } from "../module/Category/category.route";
import { donationRouter } from "../module/Donation/donation.route";
import { bkashRouter } from "../module/Payment/Bkash/bkash.route";
import { userRouter } from "../module/User/user.route";

const globalMiddleware = trpc.middleware(async ({ next, rawInput }) => {
  console.log("Request received:", rawInput);

  // You can modify the request here if needed (e.g., add extra validation or log the data)

  const result = await next(); // Proceed with the request processing

  console.log("Response sent:", result); // Log the response

  // You can also modify the response if needed

  return result;
});

export const appRouter = trpc.router({
  user: userRouter,
  category: categoryRouter,
  campaign: campaignRouter,
  donation: donationRouter,
  bkash: bkashRouter,
});

export type AppRouter = typeof appRouter;
