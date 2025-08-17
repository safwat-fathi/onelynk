export type ApiResponse<T = unknown> = {
  data: T
  message?: string
  success: boolean
}

export type ApiError = {
  message: string
  code?: string
  status?: number
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type RequestConfig = {
  headers?: Record<string, string>
  params?: Record<string, unknown>
  withAuth?: boolean
}