import prisma from "../../config/database";
import bcrypt from "bcrypt";
import { TAuthContext, TCreateUserInput, TLoginUserInput } from "./user.types";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";

export const createUserService = async (input: TCreateUserInput) => {
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
};

export const userLoginService = async (input: TLoginUserInput) => {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid email or password.",
    });
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password);
  if (!isPasswordValid) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid email or password.",
    });
  }

  const token = jwt.sign(
    { id: user.user_id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "6h" }
  );

  return { token };
};

export const getUserService = async () => {
  return await prisma.user.findMany();
};

export const currentUserService = async (ctx: TAuthContext) => {
  const { id, email, role } = ctx;
  return { id, email, role };
};

const userService = {
  createUserService,
  getUserService,
  userLoginService,
  currentUserService,
};

export default userService;
