/**
 * API Response types
 */

export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
  errors?: Record<string, string[]>
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

