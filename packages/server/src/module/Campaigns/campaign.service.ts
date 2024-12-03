import prisma from "../../config/database";
import { TCampaign, TCreateCampaign, TUpdateCampaign } from "./campaign.types";

// import { z } from "zod";
// import { createTRPCRouter, protectedProcedure } from "@/server/trpc";

// export const campaignRouter = createTRPCRouter({
//   // Fetch all campaigns (with optional filters)
//   getAll: protectedProcedure
//     .input(
//       z.object({
//         status: z.enum(["ACTIVE", "COMPLETED", "CANCELLED"]).optional(),
//         categoryId: z.string().optional(),
//       })
//     )
//     .query(async ({ ctx, input }) => {
//       const { status, categoryId } = input;
//       return await ctx.prisma.campaign.findMany({
//         where: {
//           ...(status && { status }),
//           ...(categoryId && { category_id: categoryId }),
//         },
//         include: {
//           category: true,
//           owner: true,
//         },
//       });
//     }),

//   // Fetch a single campaign by ID
//   getById: protectedProcedure
//     .input(z.object({ campaignId: z.string() }))
//     .query(async ({ ctx, input }) => {
//       return await ctx.prisma.campaign.findUnique({
//         where: { campaign_id: input.campaignId },
//         include: {
//           category: true,
//           owner: true,
//           Donation: true,
//           Comment: true,
//           Notification: true,
//           Chat: true,
//         },
//       });
//     }),

//   // Create a new campaign
//   create: protectedProcedure
//     .input(
//       z.object({
//         title: z.string(),
//         description: z.string(),
//         goalAmount: z.number(),
//         startDate: z.string(),
//         endDate: z.string(),
//         categoryId: z.string(),
//       })
//     )
//     .mutation(async ({ ctx, input }) => {
//       const userId = ctx.user_id; // Extracted from middleware
//       return await ctx.prisma.campaign.create({
//         data: {
//           title: input.title,
//           description: input.description,
//           goal_amount: input.goalAmount,
//           raised_amount: 0,
//           status: "ACTIVE", // Default status
//           start_date: new Date(input.startDate),
//           end_date: new Date(input.endDate),
//           category_id: input.categoryId,
//           owner_id: userId,
//         },
//       });
//     }),

//   // Update an existing campaign
//   update: protectedProcedure
//     .input(
//       z.object({
//         campaignId: z.string(),
//         title: z.string().optional(),
//         description: z.string().optional(),
//         goalAmount: z.number().optional(),
//         status: z.enum(["ACTIVE", "COMPLETED", "CANCELLED"]).optional(),
//         endDate: z.string().optional(),
//       })
//     )
//     .mutation(async ({ ctx, input }) => {
//       return await ctx.prisma.campaign.update({
//         where: { campaign_id: input.campaignId },
//         data: {
//           ...(input.title && { title: input.title }),
//           ...(input.description && { description: input.description }),
//           ...(input.goalAmount && { goal_amount: input.goalAmount }),
//           ...(input.status && { status: input.status }),
//           ...(input.endDate && { end_date: new Date(input.endDate) }),
//         },
//       });
//     }),

//   // Delete a campaign
//   delete: protectedProcedure
//     .input(z.object({ campaignId: z.string() }))
//     .mutation(async ({ ctx, input }) => {
//       return await ctx.prisma.campaign.delete({
//         where: { campaign_id: input.campaignId },
//       });
//     }),

//   // Get all campaigns created by the logged-in user
//   getByOwner: protectedProcedure.query(async ({ ctx }) => {
//     const userId = ctx.user_id; // Extracted from middleware
//     return await ctx.prisma.campaign.findMany({
//       where: { owner_id: userId },
//       include: {
//         category: true,
//       },
//     });
//   }),
// });

export const createCampaignService = async (
  input: TCreateCampaign,
  userId: string
) => {
  const data: TCampaign = {
    owner_id: userId,
    title: input.title,
    description: input.description,
    status: input.status,
    goal_amount: input.goalAmount,
    raised_amount: input.raisedAmount,
    start_date: new Date(input.startDate),
    end_date: new Date(input.endDate),
    category_id: input.categoryId,
  };

  return await prisma.campaign.create({ data });
};

export const getCampaignByIdService = async (id: string) => {
  return await prisma.campaign.findUnique({ where: { campaign_id: id } });
};

export const updateCampaignService = async (input: TUpdateCampaign) => {
  return await prisma.campaign.update({
    where: { campaign_id: input.campaignId },
    data: {
      ...(input.title && { title: input.title }),
      ...(input.description && { description: input.description }),
      ...(input.goalAmount && { goal_amount: input.goalAmount }),
      ...(input.status && { status: input.status }),
      ...(input.endDate && { end_date: new Date(input.endDate) }),
    },
  });
};

export const deleteCampaignService = async (id: string) => {
  return await prisma.campaign.delete({ where: { campaign_id: id } });
};

export const getCampaignByOwnerService = async (userId: string) => {
  return await prisma.campaign.findMany({ where: { owner_id: userId } });
};

export const getAllCampaignsService = async () => {
  return await prisma.campaign.findMany();
};

const campaignService = {
  createCampaignService,
  getCampaignByIdService,
  updateCampaignService,
  deleteCampaignService,
  getCampaignByOwnerService,
  getAllCampaignsService,
};

export default campaignService;
