import { TRPCError } from "@trpc/server";
export const successResponse = (data: any, code: number, message?: string) => {
  console.log("Success Response from utils:", { data, code }); // Logging for debugging
  return {
    status: "success",
    data,
    code,
    message,
  };
};

export const errorResponse = (error: unknown, trpcError: TRPCError) => {
  // Ensure error is an instance of TRPCError
  if (error instanceof TRPCError) {
    console.log(error);
    return {
      status: "error",
      error: {
        message: error.message,
        code: error.code,
        stack: error.stack,
      },
    };
  }

  // If error is not an instance of TRPCError, return a generic internal server error
  return {
    status: "error",
    error: {
      message: "An unexpected error occurred, please try again later.",
      code: "INTERNAL_SERVER_ERROR",
      data: {
        code: "INTERNAL_SERVER_ERROR",
        httpStatus: 500,
        stack: (error as Error).stack, // Attach the stack trace for debugging
        path: "unknown", // If path is not available
      },
    },
    trpcError: error,
  };
};
