import { NextFunction, Request, Response } from "express";

// Global middleware
export const globalRouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);

  // Continue to the next middleware or route handler
  next();
};
