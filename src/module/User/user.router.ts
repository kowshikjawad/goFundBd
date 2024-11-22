import prisma from "../../config/database";
import { trpc } from "../../config/trpc";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { userValidationSchemas } from "./user.validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";
import { loggerMiddleware } from "../../middlewares/loggerMiddleware";

const { createUserValidationSchema, loginUserValidationSchema } =
  userValidationSchemas;

const trpcProcedure = trpc.procedure.use(loggerMiddleware);

export const userRouter = trpc.router({
  getUser: trpcProcedure.query(async () => {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }),

  createUser: trpcProcedure
    .input(createUserValidationSchema)
    .mutation(async ({ input }) => {
      try {
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const user = await prisma.user.create({
          data: {
            display_name: input.name,
            email: input.email,
            password: hashedPassword,
            role: input.role,
          },
        });
        return user;
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }),

  login: trpcProcedure
    .input(loginUserValidationSchema)
    .mutation(async ({ input }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email: input.email },
        });

        if (!user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password.",
          });
        }

        const isPasswordValid = await bcrypt.compare(
          input.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password.",
          });
        }

        const token = jwt.sign(
          { id: user.user_id, email: user.email, role: user.role },
          process.env.JWT_SECRET!,
          { expiresIn: "1h" }
        );

        return { token };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }),

  currentUser: trpcProcedure.use(authMiddleware).query(({ ctx }) => {
    if (!ctx?.id) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not authenticated.",
      });
    }

    const { id, email, role } = ctx;
    return { id, email, role };
  }),
});
