import { TRPCError } from "@trpc/server";
import { successResponse } from "../../utils/httpResponse";
import {
  createCampaignService,
  deleteCampaignService,
  getAllCampaignsService,
  getCampaignByIdService,
  getCampaignByOwnerService,
  updateCampaignService,
} from "./campaign.service";
import { TCreateCampaign, TUpdateCampaign } from "./campaign.types";

export const createCampaignController = async (
  input: TCreateCampaign,
  userId: string
) => {
  try {
    const campaign = await createCampaignService(input, userId);

    if (!campaign) {
      throw new Error("Failed to create campaign");
    } else {
      return successResponse(campaign, 201, "Campaign created successfully");
    }
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
  }
};

export const getCampaignByIdController = async (id: string) => {
  try {
    const campaign = await getCampaignByIdService(id);
    return successResponse(campaign, 200);
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
  }
};

export const getAllCampaignsController = async () => {
  try {
    const campaigns = await getAllCampaignsService();
    return successResponse(campaigns, 200);
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
  }
};

export const updateCampaignController = async (input: TUpdateCampaign) => {
  try {
    const campaign = await updateCampaignService(input);
    return successResponse(campaign, 204, "Campaign updated successfully");
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
  }
};

export const deleteCampaignController = async (id: string) => {
  try {
    const campaign = await deleteCampaignService(id);
    return successResponse(campaign, 204, "Campaign deleted successfully");
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
  }
};

export const getCampaignByOwnerController = async (userId: string) => {
  try {
    const campaigns = await getCampaignByOwnerService(userId);
    return successResponse(campaigns, 200);
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
  }
};

const campaignController = {
  createCampaignController,
  getCampaignByIdController,
  getAllCampaignsController,
  updateCampaignController,
  deleteCampaignController,
  getCampaignByOwnerController,
};

export default campaignController;
