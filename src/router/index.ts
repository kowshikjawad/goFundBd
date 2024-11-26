import { trpc } from "../config/trpc";
import { userRouter } from "../module/User/user.route";

export const appRouter = trpc.router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
