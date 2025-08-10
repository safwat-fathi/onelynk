import { Product } from "./products.types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`, {
    next: { tags: ['products'] } // Caching with a tag
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
