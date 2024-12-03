type Role = "Donor" | "CampaignOwner" | "Admin";

export type TCreateUserInput = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export type TLoginUserInput = {
  email: string;
  password: string;
};

export type TAuthContext = {
  id: string;
  email: string;
  role: string;
};
