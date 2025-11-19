import { apiClient } from '~/utils/axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * Composable để sử dụng API với axios
 * 
 * @example
 * const { get, post, put, delete: del } = useApi()
 * 
 * // GET request
 * const users = await get('/users')
 * 
 * // POST request
 * const newUser = await post('/users', { name: 'John', email: 'john@example.com' })
 */
export const useApi = () => {
  /**
   * GET request
   */
  const get = async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.get(url, config)
    return response.data
  }

  /**
   * POST request
   */
  const post = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.post(url, data, config)
    return response.data
  }

  /**
   * PUT request
   */
  const put = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.put(url, data, config)
    return response.data
  }

  /**
   * PATCH request
   */
  const patch = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.patch(url, data, config)
    return response.data
  }

  /**
   * DELETE request
   */
  const del = async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.delete(url, config)
    return response.data
  }

  /**
   * Upload file
   */
  const upload = async <T = any>(
    url: string,
    file: File | FormData,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<T> => {
    const formData = file instanceof FormData ? file : new FormData()
    if (file instanceof File) {
      formData.append('file', file)
    }

    const response: AxiosResponse<T> = await apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    })
    return response.data
  }

  return {
    get,
    post,
    put,
    patch,
    delete: del,
    upload,
    // Export axios instance nếu cần sử dụng trực tiếp
    client: apiClient
  }
}

