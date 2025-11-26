import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/color-mode'
  ],
  build: {
    transpile: [
      'vue-i18n',
      'naive-ui',
      'vueuc',
      '@css-render/vue3-ssr',
      '@juggle/resize-observer'
    ]
  },
  // Tối ưu Vite cho hiệu suất tốt hơn
  vite: {
    // Tối ưu build performance
    build: {
      // Chunk splitting strategy - chia nhỏ code để tải nhanh hơn
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-vue': ['vue', 'vue-router'],
          }
        }
      },
      // Tăng tốc build
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Xóa console.log trong production
          drop_debugger: true
        }
      }
    },
    // Tối ưu dev server
    server: {
      hmr: {
        overlay: true // Hiển thị lỗi overlay trong dev mode
      }
    },
    // Tối ưu dependencies
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'naive-ui',
        'vueuc',
        '@css-render/vue3-ssr',
        '@juggle/resize-observer'
      ],
      exclude: []
    },
    // CSS optimization
    css: {
      devSourcemap: true // Source map cho CSS trong dev mode
    },
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json')
        ]
      })
    ]
  },
  css: ['~/assets/styles/main.css'],
  app: {
    head: {
      meta: [
        { name: 'naive-ui-style' }
      ],
      title: process.env.TITLE || 'Nuxt 3 Master',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate icon', type: 'image/x-icon', href: '/favicon.svg' }
      ]
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,
  devServer: {
    port: Number(process.env.PORT) || 1000,
    host: '0.0.0.0'
  },

  // Runtime config cho API
  runtimeConfig: {
    // Private keys (chỉ có ở server-side)
    apiSecret: process.env.API_SECRET,
    isDevMode: process.env.DEV_MODE === 'true',
    
    // Public keys (có thể truy cập từ client-side)
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'
    }
  },

  // Color Mode Configuration
  colorMode: {
    preference: 'system', // 'system', 'light', hoặc 'dark'
    fallback: 'light', // Fallback nếu không detect được system preference
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    // classPrefix: 'theme-', // Thay đổi từ 'dark' thành 'theme-dark', 'light' thành 'theme-light'
    classPrefix: '', // Thay đổi từ 'dark' thành 'theme-dark', 'light' thành 'theme-light'
    classSuffix: '', // Có thể dùng suffix nếu muốn: 'dark-mode', 'light-mode'
    storage: 'localStorage',
    storageKey: 'nuxt-color-mode', // lưu value nuxt-color-mode trong localStorage ( dark, light)
  },
  typescript: {
    tsConfig: {
      include: ['types/**/*.d.ts']
    }
  }
})