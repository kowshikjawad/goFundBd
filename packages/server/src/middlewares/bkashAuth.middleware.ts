import { TRPCError } from "@trpc/server";
import axios from "axios";
import { Context, trpc } from "../config/trpc";

interface BkashAuthContext extends Context {
  bkashToken: string;
}

export const bkashAuthMiddleware = trpc.middleware(async ({ ctx, next }) => {
  (ctx as BkashAuthContext).bkashToken = "";
  try {
    // Make the API call to get the bKash token
    const { data } = await axios.post(
      process.env.bkash_grant_token_url!,
      {
        app_key: process.env.bkash_api_key,
        app_secret: process.env.bkash_secret_key,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: process.env.bkash_username,
          password: process.env.bkash_password,
        },
      }
    );

    // Attach the id_token to the context
    (ctx as BkashAuthContext).bkashToken = data.id_token;

    // Proceed to the next middleware or resolver
    return next({
      ctx: {
        ...ctx,
        bkashToken: data.id_token, // Ensure the token is available in the context
      },
    });
  } catch (error) {
    // Handle errors gracefully and throw a TRPCError for unauthorized requests
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
      cause: error,
    });
  }
});
