import { API_ENDPOINTS } from '@/shared/constants/api'
import { PaginatedResponse } from '@/shared/types/api'
import { Product } from '@/shared/types/product'

/**
 * Server-side data fetching with Next.js caching
 */

export class ProductDataFetcher {
  static async fetchProducts(params?: {
    page?: number
    limit?: number
    search?: string
    status?: string
  }) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'
    const page = params?.page || 1
    const limit = params?.limit || 10
    
    // Build query string
    const queryParams = new URLSearchParams()
    queryParams.set('page', page.toString())
    queryParams.set('limit', limit.toString())
    
    if (params?.search) {
      queryParams.set('search', params.search)
    }
    
    if (params?.status) {
      queryParams.set('status', params.status)
    }
    
    const url = `${baseUrl}${API_ENDPOINTS.PRODUCTS.BASE}?${queryParams.toString()}`
    
    // Use Next.js fetch with caching
    const response = await fetch(url, {
      next: {
        revalidate: 60, // Revalidate at most every 60 seconds
        tags: ['products'] // Allow revalidation by tag
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }
    
    return response.json() as Promise<PaginatedResponse<Product>>
  }
}