# Composables

Thư mục này chứa các composable functions (tương tự như hooks trong React).

Nuxt tự động import và làm cho chúng có sẵn trong toàn bộ ứng dụng.

**Ví dụ:**
```typescript
// composables/useCounter.ts
export const useCounter = () => {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
}

// Sử dụng trong component:
const { count, increment } = useCounter()
```

Xem thêm: https://nuxt.com/docs/guide/directory-structure/composables

