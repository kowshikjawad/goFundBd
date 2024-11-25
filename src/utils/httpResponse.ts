export const successResponse = (data: any, code: number) => ({
  status: "success",
  code,
  data,
});
