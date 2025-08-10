import { User } from "@/domains/users/users.types";

export type LoginDto = {
  email: string;
  password: string
}

export type LoginResponse = {
  user: User;
  access_token: string;
  refresh_token: string;
}

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User | null) => void;
  setTokens: (access: string, refresh: string) => void;
  logout: () => void;
};
