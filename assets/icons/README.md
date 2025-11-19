# Icons

Thư mục này chứa các icon files (SVG, PNG, etc.) cần được xử lý bởi Vite.

**Cách sử dụng:**
```vue
<template>
  <!-- Import SVG -->
  <img src="~/assets/icons/home.svg" alt="Home" />
  
  <!-- Hoặc import trong script -->
  <component :is="homeIcon" />
</template>

<script setup>
import homeIcon from '~/assets/icons/home.svg?component'
</script>
```

**Lưu ý:**
- Với Nuxt Icon module, bạn có thể sử dụng `<Icon name="..." />` thay vì import thủ công
- SVG files có thể được import như component với `?component` suffix

