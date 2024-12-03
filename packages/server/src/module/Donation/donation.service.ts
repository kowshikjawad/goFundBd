import prisma from "../../config/database";
import { TDonation } from "./donation.type";

export const createDonationService = async (input: TDonation) => {
  return await prisma.donation.create({ data: input });
};

export const getUserDonationsService = async (id: string) => {
  return await prisma.donation.findMany({ where: { user_id: id } });
};

const donationService = {
  createDonationService,
  getUserDonationsService,
};

export default donationService;
