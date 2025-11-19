# Thư viện hỗ trợ Circle Spread Theme Transition

## Các thư viện phổ biến:

### 1. **GSAP (GreenSock Animation Platform)** ⭐ Khuyến nghị
- **Website:** https://greensock.com/gsap/
- **Kích thước:** ~50KB (gzipped)
- **Ưu điểm:**
  - Mạnh mẽ, performance cao
  - Hỗ trợ Vue/Nuxt tốt
  - Có plugin `DrawSVG`, `MorphSVG`, `MotionPath`
  - Timeline control tốt
- **Cài đặt:**
```bash
yarn add gsap
```

### 2. **Anime.js**
- **Website:** https://animejs.com/
- **Kích thước:** ~17KB (gzipped)
- **Ưu điểm:**
  - Nhẹ, dễ sử dụng
  - Syntax đơn giản
  - Hỗ trợ nhiều loại animation
- **Cài đặt:**
```bash
yarn add animejs
```

### 3. **Motion One** (Mới, nhẹ)
- **Website:** https://motion.dev/
- **Kích thước:** ~5KB (gzipped)
- **Ưu điểm:**
  - Rất nhẹ
  - Modern API
  - Performance tốt
- **Cài đặt:**
```bash
yarn add motion
```

### 4. **VueUse - useTransition**
- **Website:** https://vueuse.org/core/usetransition/
- **Kích thước:** Đã có sẵn nếu dùng VueUse
- **Ưu điểm:**
  - Tích hợp sẵn với Vue
  - Composable pattern
  - TypeScript support
- **Cài đặt:**
```bash
yarn add @vueuse/core
```

## So sánh:

| Thư viện | Kích thước | Performance | Dễ dùng | Vue Support |
|----------|-----------|-------------|---------|-------------|
| **GSAP** | ~50KB | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ Tốt |
| **Anime.js** | ~17KB | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ Tốt |
| **Motion One** | ~5KB | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ Tốt |
| **VueUse** | ~10KB | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ Rất tốt |

## Khuyến nghị:

### Cho hiệu ứng circle spread theme transition:

1. **GSAP** - Nếu cần animation phức tạp và performance cao
2. **Anime.js** - Nếu muốn đơn giản và nhẹ
3. **Motion One** - Nếu muốn hiện đại và rất nhẹ
4. **Custom (hiện tại)** - Nếu muốn control hoàn toàn và không thêm dependency

## Ví dụ với GSAP:

```typescript
import { gsap } from 'gsap'

const overlay = document.createElement('div')
overlay.style.backgroundColor = '#ffffff'
document.body.appendChild(overlay)

gsap.fromTo(overlay, 
  { clipPath: 'circle(0% at 50% 50%)' },
  { 
    clipPath: 'circle(150% at 50% 50%)',
    duration: 0.6,
    ease: 'power2.out',
    onComplete: () => {
      // Cleanup
    }
  }
)
```

## Ví dụ với Anime.js:

```typescript
import anime from 'animejs'

anime({
  targets: overlay,
  clipPath: [
    { value: 'circle(0% at 50% 50%)' },
    { value: 'circle(150% at 50% 50%)' }
  ],
  duration: 600,
  easing: 'easeOutExpo'
})
```

## Kết luận:

- **Hiện tại:** Code custom đã hoạt động tốt, không cần thư viện
- **Nếu muốn:** GSAP hoặc Anime.js sẽ cho control tốt hơn và animation mượt hơn
- **Nếu muốn nhẹ:** Motion One là lựa chọn tốt

