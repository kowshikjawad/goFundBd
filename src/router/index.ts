import { trpc } from "../config/trpc";
import { userRouter } from "../module/User/user.router";

export const appRouter = trpc.router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
