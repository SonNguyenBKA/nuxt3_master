# Thư viện hỗ trợ Theme Transition với Circle Spread

## Vấn đề
Hiệu ứng circle spread theme transition (giống lightswind.com) không có thư viện chuyên dụng, nhưng có thể dùng các thư viện animation sau:

## Các thư viện có thể dùng:

### 1. **Motion One** ⭐ Khuyến nghị cho Vue
- **Website:** https://motion.dev/
- **Package:** `motion` hoặc `@vueuse/motion`
- **Kích thước:** ~5KB
- **Ưu điểm:**
  - Rất nhẹ
  - Hỗ trợ Vue 3/Nuxt 3 tốt
  - API đơn giản
  - Performance cao
- **Cài đặt:**
```bash
yarn add motion
# hoặc
yarn add @vueuse/motion
```

### 2. **VueUse - useTransition**
- **Website:** https://vueuse.org/core/usetransition/
- **Package:** `@vueuse/core`
- **Ưu điểm:**
  - Tích hợp sẵn với Vue
  - Composable pattern
  - TypeScript support
- **Cài đặt:**
```bash
yarn add @vueuse/core
```

### 3. **Vue Magic UI**
- **Website:** https://www.npmjs.com/package/@yousefkadah/vue-magic-ui
- **Package:** `@yousefkadah/vue-magic-ui`
- **Ưu điểm:**
  - Component sẵn có với animation
  - Hỗ trợ nhiều hiệu ứng
- **Cài đặt:**
```bash
yarn add @yousefkadah/vue-magic-ui
```

### 4. **GSAP** (Đã cài)
- **Website:** https://greensock.com/gsap/
- **Package:** `gsap` ✅ Đã có
- **Ưu điểm:**
  - Mạnh mẽ nhất
  - Performance cao
  - Có thể cần plugin cho clip-path

## Thư viện chuyên dụng cho Theme Transition:

### **@nuxtjs/color-mode** (Đã có)
- Hỗ trợ theme switching nhưng **KHÔNG có** animation circle spread
- Cần tự implement animation

## Khuyến nghị:

### Option 1: Dùng Motion One (Nhẹ nhất)
```bash
yarn add motion
```

### Option 2: Dùng VueUse Motion (Tích hợp Vue tốt)
```bash
yarn add @vueuse/motion
```

### Option 3: Tiếp tục dùng GSAP (Đã có)
- Code hiện tại đã dùng GSAP
- Có thể cần điều chỉnh implementation

## Lưu ý:

⚠️ **Không có thư viện nào có sẵn component circle spread theme transition**

Tất cả các thư viện trên chỉ cung cấp:
- Animation utilities
- Transition helpers
- Component với animation cơ bản

**Bạn vẫn cần tự implement logic circle spread với clip-path**

## Giải pháp:

1. **Tiếp tục dùng GSAP** (đã cài) - chỉ cần fix implementation
2. **Chuyển sang Motion One** - nhẹ hơn, API đơn giản hơn
3. **Dùng VueUse Motion** - tích hợp Vue tốt nhất

Bạn muốn tôi thử implement lại với Motion One không?

