'use client'

import { API_BASE_URL, API_ENDPOINTS, HTTP_STATUS } from '@/shared/constants/api'
import { ApiError, RequestConfig } from '@/shared/types/api'
import { COOKIE_NAMES, getCookie, setCookie, clearAuthCookies } from '@/shared/utils/cookies'

class HttpClient {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit,
    config: RequestConfig = {}
  ): Promise<T> {
    const { withAuth = true, headers = {}, params } = config

    let url = `${this.baseURL}${endpoint}`
    
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`
      }
    }

    const requestHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...headers
    }

    if (withAuth) {
      const accessToken = getCookie(COOKIE_NAMES.ACCESS_TOKEN)
      if (accessToken) {
        requestHeaders.Authorization = `Bearer ${accessToken}`
      }
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: requestHeaders
      })

      if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        const refreshed = await this.handleTokenRefresh()
        if (refreshed) {
          const newAccessToken = getCookie(COOKIE_NAMES.ACCESS_TOKEN)
          if (newAccessToken) {
            requestHeaders.Authorization = `Bearer ${newAccessToken}`
            const retryResponse = await fetch(url, {
              ...options,
              headers: requestHeaders
            })
            return this.handleResponse<T>(retryResponse)
          }
        }
        clearAuthCookies()
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login'
        }
        throw new Error('Authentication failed')
      }

      return this.handleResponse<T>(response)
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network error occurred')
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type')
    
    if (!response.ok) {
      let errorMessage = 'An error occurred'
      
      if (contentType?.includes('application/json')) {
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          // Fallback if JSON parsing fails
        }
      } else {
        errorMessage = await response.text() || errorMessage
      }

      const apiError: ApiError = {
        message: errorMessage,
        status: response.status
      }
      
      throw apiError
    }

    if (contentType?.includes('application/json')) {
      const data = await response.json()
      return data.data || data
    }

    return response.text() as T
  }

  private async handleTokenRefresh(): Promise<boolean> {
    try {
      const refreshToken = getCookie(COOKIE_NAMES.REFRESH_TOKEN)
      if (!refreshToken) return false

      const response = await fetch(`${this.baseURL}${API_ENDPOINTS.AUTH.REFRESH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      })

      if (response.ok) {
        const data = await response.json()
        const { accessToken, refreshToken: newRefreshToken } = data.tokens || data
        
        setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, 1) // 1 day
        if (newRefreshToken) {
          setCookie(COOKIE_NAMES.REFRESH_TOKEN, newRefreshToken, 7) // 7 days
        }
        
        return true
      }
      
      return false
    } catch (error) {
      console.error('Token refresh failed:', error)
      return false
    }
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'GET' }, config)
  }

  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.makeRequest<T>(
      endpoint,
      {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined
      },
      config
    )
  }

  async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.makeRequest<T>(
      endpoint,
      {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined
      },
      config
    )
  }

  async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.makeRequest<T>(
      endpoint,
      {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined
      },
      config
    )
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' }, config)
  }
}

export const httpClient = new HttpClient()
export default httpClient