# Middleware

Thư mục này chứa các route middleware để chạy trước khi render page.

**Ví dụ:**
```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = false // kiểm tra auth
  if (!isAuthenticated) {
    return navigateTo('/login')
  }
})
```

Sử dụng trong page:
```vue
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
```

Xem thêm: https://nuxt.com/docs/guide/directory-structure/middleware

