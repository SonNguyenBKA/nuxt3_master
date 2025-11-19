# colorMode.preference vs colorMode.value

## `colorMode.preference` là gì?

`colorMode.preference` là **user preference** (lựa chọn của người dùng) - giá trị mà user đã chọn hoặc cấu hình mặc định.

## Phân biệt `preference` và `value`

### `colorMode.preference` (User Preference)
- **Là gì:** Lựa chọn của user hoặc giá trị mặc định từ config
- **Giá trị có thể:** `'light'`, `'dark'`, hoặc `'system'`
- **Dùng để:** Set theme mà user muốn
- **Lưu ở đâu:** localStorage với key `storageKey`

### `colorMode.value` (Current Theme)
- **Là gì:** Theme đang được áp dụng thực tế
- **Giá trị có thể:** `'light'` hoặc `'dark'` (KHÔNG có `'system'`)
- **Dùng để:** Kiểm tra theme hiện tại đang active
- **Tự động tính:** Dựa trên `preference` và system preference

## Ví dụ minh họa

### Trường hợp 1: User chọn 'light'
```javascript
colorMode.preference = 'light'
// → colorMode.value = 'light'
// → <html class="theme-light">
```

### Trường hợp 2: User chọn 'dark'
```javascript
colorMode.preference = 'dark'
// → colorMode.value = 'dark'
// → <html class="theme-dark">
```

### Trường hợp 3: User chọn 'system'
```javascript
colorMode.preference = 'system'
// → colorMode.value = 'dark' (nếu system là dark)
//    hoặc 'light' (nếu system là light)
// → <html class="theme-dark"> hoặc <html class="theme-light">
```

## So sánh

| | `preference` | `value` |
|---|---|---|
| **Giá trị** | `'light'`, `'dark'`, `'system'` | `'light'` hoặc `'dark'` |
| **Mục đích** | Lưu lựa chọn của user | Theme đang active |
| **Có thể set** | ✅ Có | ❌ Không (tự động) |
| **Lưu localStorage** | ✅ Có | ❌ Không |
| **Dùng trong CSS** | ❌ Không | ✅ Có |

## Code ví dụ

```vue
<script setup>
const colorMode = useColorMode()

// Set preference
colorMode.preference = 'dark'  // User chọn dark
colorMode.preference = 'light' // User chọn light
colorMode.preference = 'system' // User chọn theo system

// Đọc preference
console.log(colorMode.preference) // 'dark', 'light', hoặc 'system'

// Đọc value (theme đang active)
console.log(colorMode.value) // 'dark' hoặc 'light' (KHÔNG có 'system')

// Kiểm tra
if (colorMode.preference === 'system') {
  // User muốn theo system
  console.log('Theme đang active:', colorMode.value) // 'dark' hoặc 'light'
}
</script>

<template>
  <div>
    <!-- Hiển thị preference -->
    <p>User đã chọn: {{ colorMode.preference }}</p>
    
    <!-- Hiển thị theme đang active -->
    <p>Theme đang dùng: {{ colorMode.value }}</p>
    
    <!-- Conditional rendering dựa trên value -->
    <div v-if="colorMode.value === 'dark'">
      Dark mode đang active
    </div>
  </div>
</template>
```

## Trong useTheme composable

```typescript
// preference: Lựa chọn của user
preference: computed(() => colorMode.preference) // 'light' | 'dark' | 'system'

// currentTheme: Theme đang active (từ value)
currentTheme: computed(() => colorMode.value) // 'light' | 'dark'

// isDark: Kiểm tra theme đang active
isDark: computed(() => colorMode.value === 'dark') // true/false
```

## Khi nào dùng gì?

### Dùng `preference` khi:
- ✅ Set theme mà user muốn: `colorMode.preference = 'dark'`
- ✅ Hiển thị lựa chọn của user: `User selected: {{ preference }}`
- ✅ Lưu vào localStorage (tự động)

### Dùng `value` khi:
- ✅ Kiểm tra theme đang active: `if (colorMode.value === 'dark')`
- ✅ Conditional rendering: `v-if="colorMode.value === 'dark'"`
- ✅ CSS class: `.theme-dark` (dựa trên value)

## Flow hoạt động

```
1. User chọn theme
   colorMode.preference = 'system'
   ↓
2. Module tính toán value
   - Nếu preference = 'system' → Detect system → value = 'dark' hoặc 'light'
   - Nếu preference = 'dark' → value = 'dark'
   - Nếu preference = 'light' → value = 'light'
   ↓
3. Set class vào HTML
   <html class="theme-{value}">
   ↓
4. Lưu preference vào localStorage
   localStorage.setItem('nuxt-color-mode', preference)
```

## Tóm tắt

- **`preference`**: Lựa chọn của user (`'light'`, `'dark'`, `'system'`)
- **`value`**: Theme đang active (`'light'` hoặc `'dark'`)
- **Set `preference`** → Module tự động tính `value` → Set class vào HTML

