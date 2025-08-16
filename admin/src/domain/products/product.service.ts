import { httpClient } from '@/infrastructure/api/http-client'
import { API_ENDPOINTS } from '@/shared/constants/api'
import { PaginatedResponse } from '@/shared/types/api'
import { Product, ProductCreateData, ProductUpdateData } from '@/shared/types/product'

export class ProductService {
  async getProducts(params?: {
    page?: number
    limit?: number
    search?: string
    category?: string
    status?: string
  }): Promise<PaginatedResponse<Product>> {
    return httpClient.get<PaginatedResponse<Product>>(
      API_ENDPOINTS.PRODUCTS.BASE,
      { params }
    )
  }

  async getProduct(id: string): Promise<Product> {
    return httpClient.get<Product>(API_ENDPOINTS.PRODUCTS.BY_ID(id))
  }

  async createProduct(data: ProductCreateData): Promise<Product> {
    return httpClient.post<Product>(API_ENDPOINTS.PRODUCTS.BASE, data)
  }

  async updateProduct(id: string, data: ProductUpdateData): Promise<Product> {
    return httpClient.patch<Product>(API_ENDPOINTS.PRODUCTS.BY_ID(id), data)
  }

  async deleteProduct(id: string): Promise<void> {
    return httpClient.delete<void>(API_ENDPOINTS.PRODUCTS.BY_ID(id))
  }
}

export const productService = new ProductService()