# Computed vs Ref - Khi nào cần computed()?

## Câu hỏi: `computed(() => colorMode.preference)` có cần thiết không?

## Trả lời: **KHÔNG CẦN THIẾT**

## Lý do:

### 1. `colorMode.preference` đã là reactive ref

`useColorMode()` từ `@nuxtjs/color-mode` trả về một object với `preference` là một **reactive ref**:

```typescript
const colorMode = useColorMode()
// colorMode.preference đã là ref<string> rồi!
```

### 2. Computed chỉ cần khi có tính toán

`computed()` chỉ cần thiết khi bạn cần:
- Tính toán/transform giá trị
- Derive giá trị từ nhiều nguồn
- Cache kết quả tính toán

```typescript
// ❌ KHÔNG CẦN - preference đã là ref
preference: computed(() => colorMode.preference)

// ✅ CẦN - Tính toán từ value
currentTheme: computed(() => colorMode.value)

// ✅ CẦN - Tính toán boolean
isDark: computed(() => colorMode.value === 'dark')

// ✅ CẦN - Transform giá trị
themeLabel: computed(() => {
  if (colorMode.value === 'dark') return 'Dark Mode'
  return 'Light Mode'
})
```

## So sánh:

### Cách 1: Dùng computed (không cần thiết)
```typescript
preference: computed(() => colorMode.preference)
```
- Tạo thêm một computed ref không cần thiết
- Overhead nhỏ (không đáng kể nhưng không cần)

### Cách 2: Dùng trực tiếp (tối ưu)
```typescript
preference: colorMode.preference
```
- Trả về ref gốc
- Không có overhead
- Đơn giản hơn

## Khi nào cần computed?

### ✅ CẦN computed khi:

1. **Tính toán từ nhiều nguồn:**
```typescript
const fullName = computed(() => `${firstName.value} ${lastName.value}`)
```

2. **Transform giá trị:**
```typescript
const themeLabel = computed(() => {
  return colorMode.value === 'dark' ? 'Dark Mode' : 'Light Mode'
})
```

3. **Filter/Map:**
```typescript
const filteredItems = computed(() => items.value.filter(i => i.active))
```

4. **Derive từ computed khác:**
```typescript
const isDark = computed(() => colorMode.value === 'dark')
const isLight = computed(() => !isDark.value)
```

### ❌ KHÔNG CẦN computed khi:

1. **Giá trị đã là ref:**
```typescript
// ❌ Không cần
const name = computed(() => userName.value)

// ✅ Đúng
const name = userName
```

2. **Chỉ cần pass through:**
```typescript
// ❌ Không cần
preference: computed(() => colorMode.preference)

// ✅ Đúng
preference: colorMode.preference
```

## Trong code của bạn:

```typescript
// ✅ CẦN - Tính toán boolean
isDark: computed(() => colorMode.value === 'dark')
isLight: computed(() => colorMode.value === 'light')
isSystem: computed(() => colorMode.preference === 'system')

// ✅ CẦN - Tính toán từ value
currentTheme: computed(() => colorMode.value)

// ❌ KHÔNG CẦN - preference đã là ref
preference: colorMode.preference  // Đúng!
// preference: computed(() => colorMode.preference)  // Sai!
```

## Performance:

- **Computed có overhead nhỏ:** Cache, dependency tracking
- **Ref trực tiếp:** Không có overhead
- **Trong trường hợp này:** Overhead không đáng kể, nhưng không cần thiết

## Best Practice:

> **Chỉ dùng `computed()` khi bạn cần tính toán/transform giá trị. Nếu giá trị đã là reactive ref, hãy dùng trực tiếp.**

## Tóm tắt:

- `colorMode.preference` đã là reactive ref → **Không cần `computed()`**
- `colorMode.value` cần computed vì có thể thay đổi → **Cần `computed()`**
- `isDark`, `isLight` cần tính toán → **Cần `computed()`**

