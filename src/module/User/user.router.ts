import { trpc } from "../../config/trpc";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { userValidationSchemas } from "./user.validation";

import { loggerMiddleware } from "../../middlewares/loggerMiddleware";
import {
  createUserController,
  currentUserController,
  getUsersController,
  userLoginController,
} from "./user.controller";

const { createUserValidationSchema, loginUserValidationSchema } =
  userValidationSchemas;

const trpcProcedure = trpc.procedure.use(loggerMiddleware);

export const userRouter = trpc.router({
  getUser: trpcProcedure.query(() => getUsersController()),

  createUser: trpcProcedure
    .input(createUserValidationSchema)
    .mutation(({ input }) => createUserController(input)),

  login: trpcProcedure
    .input(loginUserValidationSchema)
    .mutation(({ input }) => userLoginController(input)),

  currentUser: trpcProcedure
    .use(authMiddleware)
    .query(({ ctx }) => currentUserController(ctx)),
});
