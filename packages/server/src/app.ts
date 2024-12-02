import express, { Application } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./router";
import cors from "cors";
import { expressHandler } from "trpc-playground/handlers/express";
import dotenv from "dotenv";
import { createContext } from "./config/trpc";

const runApp = async () => {
  dotenv.config();
  const app: Application = express();
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(express.json());

  const trpcApiEndpoint = "/api/trpc";
  const playgroundEndpoint = "/api/trpc-playground";

  app.use(
    trpcApiEndpoint,
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: createContext,
    })
  );

  app.use(
    playgroundEndpoint,
    await expressHandler({
      trpcApiEndpoint,
      playgroundEndpoint,
      router: appRouter,
    })
  );

  const port = process.env.PORT ?? 3000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

runApp();
