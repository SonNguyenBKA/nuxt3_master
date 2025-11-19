# Images

Thư mục này chứa các hình ảnh cần được xử lý bởi Vite.

**Cách sử dụng:**
```vue
<template>
  <!-- Import trong template -->
  <img src="~/assets/images/logo.png" alt="Logo" />
  
  <!-- Hoặc import trong script -->
  <img :src="logoImage" alt="Logo" />
</template>

<script setup>
import logoImage from '~/assets/images/logo.png'
</script>
```

**Lưu ý:**
- Hình ảnh sẽ được optimize và có hash trong filename khi build
- Sử dụng `public/` cho các hình ảnh tĩnh không cần xử lý

