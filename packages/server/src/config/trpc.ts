import { initTRPC, inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = (
  opts: trpcExpress.CreateExpressContextOptions
) => {
  const { req, res } = opts;
  return {
    req,
    res,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;

export const trpc = initTRPC.context<Context>().create();
