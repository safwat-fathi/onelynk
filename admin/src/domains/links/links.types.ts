import { User } from "@/domains/users/users.types";

export type Link = {
  id: number;
  user: User;
  title: string;
  url: string;
  position: number;
  created_at: Date;
  updated_at: Date;
};

export type CreateLinkDto = {
  title: string;
  url: string;
  position: number;
};

export type UpdateLinkDto = Partial<CreateLinkDto>;
