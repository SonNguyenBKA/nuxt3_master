import { defineNuxtPlugin } from '#app'
import { apiClient } from '~/utils/axios'

export default defineNuxtPlugin((nuxtApp) => {
  // Inject axios instance vào Nuxt app để sử dụng trong components
  return {
    provide: {
      api: apiClient
    }
  }
})

