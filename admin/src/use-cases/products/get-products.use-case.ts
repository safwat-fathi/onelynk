import { ProductDataFetcher } from '@/infrastructure/api/product-data-fetcher'
import { PaginatedResponse } from '@/shared/types/api'
import { Product } from '@/shared/types/product'

/**
 * Use case for fetching products with pagination and filtering
 */
export class GetProductsUseCase {
  async execute(params?: {
    page?: number
    limit?: number
    search?: string
    status?: string
  }): Promise<PaginatedResponse<Product>> {
    return await ProductDataFetcher.fetchProducts(params)
  }
}

export const getProductsUseCase = new GetProductsUseCase()