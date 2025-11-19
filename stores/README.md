# Stores

Thư mục này chứa các Pinia stores cho state management.

**Lưu ý:** Cần cài đặt `@pinia/nuxt` module để sử dụng.

**Ví dụ:**
```typescript
// stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: ''
  }),
  actions: {
    setUser(user: { name: string; email: string }) {
      this.name = user.name
      this.email = user.email
    }
  }
})
```

Sử dụng:
```vue
<script setup>
const userStore = useUserStore()
</script>
```

Xem thêm: https://nuxt.com/docs/getting-started/state-management

