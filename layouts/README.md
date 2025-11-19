# Layouts

Thư mục này chứa các layout components để wrap các pages.

**Ví dụ:**
```vue
<!-- layouts/default.vue -->
<template>
  <div>
    <header>Header</header>
    <slot />
    <footer>Footer</footer>
  </div>
</template>
```

Sử dụng trong page:
```vue
<!-- pages/index.vue -->
<script setup>
definePageMeta({
  layout: 'default'
})
</script>
```

Xem thêm: https://nuxt.com/docs/guide/directory-structure/layouts

