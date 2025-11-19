# Axios Configuration Guide

## Đã cài đặt và cấu hình

✅ Axios đã được cài đặt và cấu hình sẵn trong dự án.

## Cấu trúc files

```
utils/
  └── axios.ts          # Axios instance với interceptors

composables/
  └── useApi.ts         # Composable để sử dụng API dễ dàng

plugins/
  └── axios.client.ts   # Plugin inject axios vào Nuxt app

types/
  └── api.ts            # TypeScript types cho API
```

## Cấu hình Environment Variables

Tạo file `.env` trong root project:

```env
# API Base URL (public - có thể truy cập từ client)
NUXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# API Secret (private - chỉ server-side)
API_SECRET=your-secret-key-here
```

## Cách sử dụng

### 1. Sử dụng `useApi` composable (Khuyến nghị)

```vue
<template>
  <div>
    <button @click="fetchData">Fetch Data</button>
    <div v-if="data">{{ data }}</div>
  </div>
</template>

<script setup>
const { get, post, put, delete: del } = useApi()
const data = ref(null)

const fetchData = async () => {
  try {
    data.value = await get('/api/users')
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>
```

### 2. Các methods có sẵn

- `get(url, config?)` - GET request
- `post(url, data?, config?)` - POST request
- `put(url, data?, config?)` - PUT request
- `patch(url, data?, config?)` - PATCH request
- `delete(url, config?)` - DELETE request
- `upload(url, file, onProgress?)` - Upload file với progress tracking

### 3. Ví dụ đầy đủ

Xem file `composables/useApi.example.vue` để xem các ví dụ chi tiết.

## Features

### ✅ Auto Token Injection
Token từ `localStorage.getItem('token')` sẽ tự động được thêm vào header `Authorization: Bearer <token>`

### ✅ Error Handling
- 401: Tự động xóa token và có thể redirect về login
- 403: Log error
- 404: Log error
- 500: Log error
- Network errors: Xử lý tự động

### ✅ Request/Response Logging
Tự động log requests và responses trong development mode

### ✅ TypeScript Support
Đầy đủ type definitions trong `types/api.ts`

## Customization

### Thay đổi base URL

Cập nhật trong `nuxt.config.ts`:
```typescript
runtimeConfig: {
  public: {
    apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://your-api.com/api'
  }
}
```

### Thay đổi timeout

Cập nhật trong `utils/axios.ts`:
```typescript
export const apiClient: AxiosInstance = axios.create({
  timeout: 30000, // 30 seconds
  // ...
})
```

### Custom interceptors

Chỉnh sửa trong `utils/axios.ts` để thêm logic tùy chỉnh.

