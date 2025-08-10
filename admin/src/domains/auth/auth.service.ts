import { LoginDto, LoginResponse } from "./auth.types";
import { User } from "../users/users.types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (credentials: LoginDto): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    // Example of using Next.js caching, revalidate every hour
    next: { revalidate: 3600 } 
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

export const getMe = async (token: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json();
}
