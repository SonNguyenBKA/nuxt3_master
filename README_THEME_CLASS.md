# Cách thay đổi tên class Dark/Light Theme

## Cấu hình trong nuxt.config.ts

Bạn có thể thay đổi tên class bằng cách cấu hình `classPrefix` và `classSuffix`:

```typescript
colorMode: {
  classPrefix: 'theme-',  // Prefix cho class name
  classSuffix: '',         // Suffix cho class name
  // ...
}
```

## Các ví dụ cấu hình

### Ví dụ 1: Sử dụng prefix `theme-`
```typescript
classPrefix: 'theme-',
classSuffix: '',
```
**Kết quả:** `<html class="theme-dark">` hoặc `<html class="theme-light">`

### Ví dụ 2: Sử dụng suffix `-mode`
```typescript
classPrefix: '',
classSuffix: '-mode',
```
**Kết quả:** `<html class="dark-mode">` hoặc `<html class="light-mode">`

### Ví dụ 3: Sử dụng cả prefix và suffix
```typescript
classPrefix: 'app-',
classSuffix: '-theme',
```
**Kết quả:** `<html class="app-dark-theme">` hoặc `<html class="app-light-theme">`

### Ví dụ 4: Tên tùy chỉnh hoàn toàn
```typescript
classPrefix: 'color-scheme-',
classSuffix: '',
```
**Kết quả:** `<html class="color-scheme-dark">` hoặc `<html class="color-scheme-light">`

## Cập nhật CSS

Sau khi thay đổi tên class, bạn cần cập nhật CSS để match với tên class mới:

```css
/* Thay vì .dark */
.theme-dark {
  /* Dark mode styles */
}

/* Hoặc nếu dùng suffix */
.dark-mode {
  /* Dark mode styles */
}

/* Hoặc nếu dùng cả prefix và suffix */
.app-dark-theme {
  /* Dark mode styles */
}
```

## Lưu ý

- Tên class sẽ được áp dụng vào thẻ `<html>`
- Cần cập nhật tất cả CSS selectors sử dụng class cũ
- Tìm kiếm và thay thế: `.dark` → `.theme-dark` (hoặc tên mới của bạn)

