import { User } from "@/domains/users/users.types";

export enum ProductStatus {
  AVAILABLE = 'available',
  OUT_OF_STOCK = 'out_of_stock',
}

export type Product = {
  id: number;
  user: User;
  name: string;
  description: string;
  price: number;
  image_url: string;
  status: ProductStatus;
  created_at: Date;
  updated_at: Date;
};

export type CreateProductDto = {
  name: string;
  description: string;
  price: number;
  image_url: string;
  status?: ProductStatus;
};

export type UpdateProductDto = Partial<CreateProductDto>;
