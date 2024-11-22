import { TRPCError } from "@trpc/server";
import { trpc } from "../config/trpc";

// Helper function to avoid circular references in JSON.stringify
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular]";
      }
      seen.add(value);
    }
    return value;
  };
};

export const loggerMiddleware = trpc.middleware(
  async ({ path, ctx, type, rawInput, next }) => {
    const startTime = Date.now(); // Record the start time

    try {
      console.log(`
[Request Start]
  Type: ${type}
  Path: ${path}
  Input: ${JSON.stringify(rawInput, getCircularReplacer())}
  Context: ${JSON.stringify(
    { token: ctx.req.headers.authorization },
    getCircularReplacer()
  )}
`);

      // Call the next middleware or procedure
      const result = await next();

      const duration = Date.now() - startTime;
      console.log(`
[Request End]
  Type: ${type}
  Path: ${path}
  Status: ${result.ok ? "Success" : "Error"}
  Duration: ${duration}ms
`);

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;

      console.error(`
[Request Error]
  Type: ${type}
  Path: ${path}
  Input: ${JSON.stringify(rawInput, getCircularReplacer())}
  Error: ${error instanceof TRPCError ? error.message : "Unknown error"}
  Stack: ${error instanceof TRPCError ? error.stack : ""}
  Duration: ${duration}ms
`);

      throw error; // Re-throw the error to ensure proper response handling
    }
  }
);
