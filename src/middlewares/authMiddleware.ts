import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { trpc } from "../config/trpc";
import { TRPCError } from "@trpc/server";

dotenv.config();

const secret = process.env.JWT_SECRET;

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const authMiddleware = trpc.middleware(async ({ ctx, next }) => {
  const { req } = ctx;
  // Get the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authorization header is missing",
    });
  }

  // Extract the token, with or without "Bearer"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7) // Remove "Bearer " prefix
    : authHeader; // Use the full header value

  if (!token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  const decoded = jwt.verify(token, secret!) as JwtPayload;
  if (!decoded) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }
  console.log("decoded", decoded);

  return next({
    ctx: {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    },
  });
});
