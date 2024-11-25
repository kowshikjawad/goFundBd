export const successResponse = (data: any, code: number) => ({
  status: "success",
  code,
  data,
});

export const errorResponse = (error: unknown, trpcError: unknown) => ({
  status: "error",
  error,
  trpcError,
});
