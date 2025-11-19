# Utils - Best Practices

Hướng dẫn viết hàm utils có tính mở rộng và tuân thủ tiêu chuẩn.

## 📋 Nguyên tắc cơ bản

### 1. **Options Object Pattern**

❌ **Không nên:**
```ts
function formatDate(date: Date, locale: string, style: string, timezone?: string)
```

✅ **Nên:**
```ts
function formatDate(date: Date, options: FormatDateOptions = {})
```

**Lý do:**
- Dễ thêm tính năng mới mà không breaking change
- Không cần nhớ thứ tự tham số
- Có thể bỏ qua các tham số không cần

### 2. **TypeScript Types rõ ràng**

```ts
export interface FormatDateOptions {
  locale?: string
  dateStyle?: 'short' | 'medium' | 'long' | 'full'
  formatter?: (date: Date, formatted: string) => string
}
```

### 3. **Default Values**

```ts
const DEFAULT_OPTIONS: Required<Omit<FormatDateOptions, 'formatter'>> = {
  locale: 'vi-VN',
  dateStyle: 'medium'
}

const opts = {
  ...DEFAULT_OPTIONS,
  ...options
}
```

### 4. **Extensibility với Callbacks**

Cho phép người dùng customize behavior:

```ts
interface Options {
  onSuccess?: (data: unknown) => void
  onError?: (error: Error) => void
  formatter?: (value: number, formatted: string) => string
  validator?: (value: unknown) => boolean
}
```

### 5. **Error Handling**

```ts
export function formatDate(date: Date | string, options = {}) {
  // Validation
  if (!date) {
    throw new TypeError('Date is required')
  }
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  if (isNaN(dateObj.getTime())) {
    throw new TypeError('Invalid date')
  }
  
  // ... rest of code
}
```

### 6. **JSDoc Documentation**

```ts
/**
 * Format date với nhiều tùy chọn
 * 
 * @param date - Date object hoặc string
 * @param options - Tùy chọn format
 * @returns Chuỗi đã format
 * 
 * @example
 * ```ts
 * formatDate(new Date()) // "19/11/2025"
 * formatDate(new Date(), { dateStyle: 'long' }) // "19 tháng 11, 2025"
 * ```
 */
```

## 📁 Cấu trúc file

```
utils/
├── formatDate.ts      # Date utilities
├── string.ts          # String utilities
├── api.ts             # API helpers
├── storage.ts         # Storage helpers
└── README.md          # Documentation
```

## 🎯 Ví dụ thực tế

Xem các file:
- `utils/example-extensible.ts` - Ví dụ chi tiết về các pattern
- `utils/formatDate.ts` - Date utilities sử dụng **dayjs** (đã refactor)
- `utils/formatDate.example.ts` - Ví dụ sử dụng formatDate
- `utils/string.ts` - Ví dụ utilities cho string

## 📦 Dependencies

### dayjs
File `formatDate.ts` sử dụng [dayjs](https://day.js.org/) - một thư viện nhẹ và mạnh mẽ để xử lý date.

**Các plugin đã được sử dụng:**
- `relativeTime` - Format relative time ("2 giờ trước")
- `customParseFormat` - Parse custom format strings
- `localizedFormat` - Format theo locale
- `utc` & `timezone` - Hỗ trợ timezone

**Ví dụ sử dụng:**
```ts
import { formatDate, formatDateTime } from '~/utils/formatDate'

// Format cơ bản
formatDate(new Date()) // "19 tháng 11, 2025"

// Relative time
formatDate(oneHourAgo, { relative: true }) // "1 giờ trước"

// Custom format
formatDate(new Date(), { format: 'dd/MM/yyyy HH:mm' }) // "19/11/2025 14:30"

// Với timezone
formatDate(new Date(), { 
  format: 'YYYY-MM-DD HH:mm:ss',
  timeZone: 'Asia/Ho_Chi_Minh'
})
```

## ✅ Checklist khi viết utils

- [ ] Dùng Options Object Pattern
- [ ] Định nghĩa TypeScript types/interfaces
- [ ] Có default values hợp lý
- [ ] Hỗ trợ callbacks khi cần
- [ ] Validate input và throw errors rõ ràng
- [ ] JSDoc comments đầy đủ với ví dụ
- [ ] Export function và types
- [ ] Test với các edge cases

## 🔄 Migration từ code cũ

**Trước:**
```ts
export const formatDate = (date: Date | string, locale: string = 'vi-VN'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString(locale)
}
```

**Sau:**
```ts
export interface FormatDateOptions {
  locale?: string
  dateStyle?: 'short' | 'medium' | 'long' | 'full'
  // ... more options
}

export function formatDate(
  date: Date | string,
  options: FormatDateOptions = {}
): string {
  // ... implementation
}
```

**Backward compatible:**
```ts
// Vẫn hoạt động với code cũ
formatDate(new Date(), 'vi-VN')

// Hoặc dùng options mới
formatDate(new Date(), { locale: 'vi-VN', dateStyle: 'long' })
```
