import { TRPCError } from "@trpc/server";
import { errorResponse, successResponse } from "../../utils/httpResponse";
import {
  createDonationService,
  getUserDonationsService,
} from "./donation.service";
import { TCreateDonation } from "./donation.type";

export const createDonationController = async (
  input: TCreateDonation,
  id: string
) => {
  const inputData = {
    amount: input.amount,
    donation_date: new Date(),
    campaign_id: input.campaign_id,
    user_id: id,
  };
  try {
    const donation = await createDonationService(inputData);
    return successResponse(donation, 201, "Donation created successfully");
  } catch (error) {
    const trpcError = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
    return errorResponse(error, trpcError);
  }
};

export const getUserDonationsController = async (id: string) => {
  try {
    const donations = await getUserDonationsService(id);
    return successResponse(donations, 200);
  } catch (error) {
    const trpcError = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
    });
    return errorResponse(error, trpcError);
  }
};

const donationController = {
  createDonationController,
  getUserDonationsController,
};

export default donationController;
