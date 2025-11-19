import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError }  from 'axios'

// Tạo axios instance với config mặc định
export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request interceptor
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Lấy token từ localStorage hoặc cookie
    const token = process.client ? localStorage.getItem('token') : null
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log request trong dev mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`)
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response trong dev mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Response] ${response.config.url}`, response.data)
    }

    return response
  },
  (error: AxiosError) => {
    // Xử lý lỗi chung
    if (error.response) {
      // Server trả về response với status code ngoài 2xx
      const { status, data } = error.response

      switch (status) {
        case 401:
          // Unauthorized - xóa token và redirect về login
          if (process.client) {
            localStorage.removeItem('token')
            // Có thể redirect về trang login
            // navigateTo('/login')
          }
          break
        case 403:
          // Forbidden
          console.error('Access forbidden')
          break
        case 404:
          // Not found
          console.error('Resource not found')
          break
        case 500:
          // Server error
          console.error('Server error')
          break
      }

      // Log error trong dev mode
      if (process.env.NODE_ENV === 'development') {
        console.error(`[API Error] ${error.config?.url}`, {
          status,
          data,
          message: error.message
        })
      }
    } else if (error.request) {
      // Request đã được gửi nhưng không nhận được response
      console.error('Network error:', error.message)
    } else {
      // Lỗi khi setup request
      console.error('Request setup error:', error.message)
    }

    return Promise.reject(error)
  }
)

export default apiClient

