import { trpc } from "../config/trpc";
import { categoryRouter } from "../module/Category/category.route";
import { userRouter } from "../module/User/user.route";

export const appRouter = trpc.router({
  user: userRouter,
  category: categoryRouter,
});

export type AppRouter = typeof appRouter;
