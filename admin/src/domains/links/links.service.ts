import { Link } from "./links.types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getLinks = async (token: string): Promise<Link[]> => {
  const response = await fetch(`${API_URL}/links`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    next: { tags: ['links'] }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch links');
  }

  return response.json();
};
