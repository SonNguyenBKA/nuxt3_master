# Dark/Light Theme Guide

## Đã cài đặt

✅ `@nuxtjs/color-mode` - Module chính thức của Nuxt để quản lý dark/light theme

## Cấu trúc

```
components/
  └── ThemeToggle.vue      # Component toggle theme button

composables/
  └── useTheme.ts           # Composable để quản lý theme

assets/styles/
  └── theme.css             # CSS variables cho dark/light mode

pages/
  └── theme-demo.vue        # Demo page để test theme
```

## Cách sử dụng

### 1. Sử dụng composable `useTheme`

```vue
<script setup>
const { 
  colorMode,      // ColorMode instance
  currentTheme,   // 'light' | 'dark'
  preference,     // 'light' | 'dark' | 'system'
  isDark,         // boolean
  isLight,        // boolean
  toggleTheme,    // function
  setTheme        // function
} = useTheme()

// Toggle theme
toggleTheme()

// Set theme cụ thể
setTheme('dark')
setTheme('light')
setTheme('system')
</script>
```

### 2. Sử dụng component `ThemeToggle`

```vue
<template>
  <div>
    <ThemeToggle />
  </div>
</template>
```

### 3. Sử dụng trực tiếp `useColorMode`

```vue
<script setup>
const colorMode = useColorMode()

// Get current theme
console.log(colorMode.value) // 'light' hoặc 'dark'

// Set theme
colorMode.preference = 'dark'
colorMode.preference = 'light'
colorMode.preference = 'system'
</script>
```

### 4. Sử dụng CSS với class `.theme-dark` (hoặc tên class bạn đã cấu hình)

```vue
<style scoped>
.my-component {
  background-color: var(--color-bg);
  color: var(--color-text);
}

/* Dark mode styles */
.theme-dark .my-component {
  background-color: var(--color-bg-secondary);
}
</style>
```

**Lưu ý:** Tên class có thể thay đổi tùy theo cấu hình `classPrefix` và `classSuffix` trong `nuxt.config.ts`. Xem `README_THEME_CLASS.md` để biết cách tùy chỉnh.

### 5. Sử dụng CSS Variables

File `assets/styles/theme.css` đã định nghĩa các CSS variables:

- `--color-bg` - Background chính
- `--color-bg-secondary` - Background phụ
- `--color-bg-tertiary` - Background bậc 3
- `--color-text` - Text chính
- `--color-text-secondary` - Text phụ
- `--color-text-tertiary` - Text bậc 3
- `--color-border` - Border
- `--color-primary` - Màu primary
- `--shadow-sm`, `--shadow-md`, `--shadow-lg` - Shadows

## Cấu hình

Trong `nuxt.config.ts`:

```typescript
colorMode: {
  preference: 'system', // 'system', 'light', hoặc 'dark'
  fallback: 'light',    // Fallback nếu không detect được
  storageKey: 'nuxt-color-mode' // Key để lưu trong localStorage
}
```

## Features

✅ **Auto-detect system preference** - Tự động detect theme từ hệ thống  
✅ **Persist trong localStorage** - Lưu preference của user  
✅ **Smooth transitions** - Transition mượt khi đổi theme  
✅ **TypeScript support** - Đầy đủ type definitions  
✅ **SSR compatible** - Hoạt động với SSR  

## Demo

Truy cập `/theme-demo` để xem demo đầy đủ về cách sử dụng theme.

## Tích hợp với Tailwind CSS

Nếu bạn dùng Tailwind, có thể cấu hình dark mode trong `tailwind.config.js`:

```javascript
module.exports = {
  darkMode: 'class', // Sử dụng class thay vì media query
  // ...
}
```

Sau đó sử dụng:
```html
<div class="bg-white dark:bg-gray-800">
  Content
</div>
```

## Tùy chỉnh

### Thay đổi CSS variables

Chỉnh sửa file `assets/styles/theme.css` để thay đổi màu sắc cho dark/light mode.

### Thay đổi component toggle

Chỉnh sửa `components/ThemeToggle.vue` để thay đổi UI của button toggle.

Xem thêm: https://color-mode.nuxtjs.org/

