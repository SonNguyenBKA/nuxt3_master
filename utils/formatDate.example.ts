/**
 * Ví dụ sử dụng formatDate với dayjs
 * 
 * Chạy: npx tsx utils/formatDate.example.ts
 */

import { formatDate, formatDateTime } from './formatDate'

console.log('=== Ví dụ formatDate với dayjs ===\n')

// 1. Format cơ bản
console.log('1. Format cơ bản:')
console.log(formatDate(new Date()))
// Output: "19 tháng 11, 2025" (tùy locale)

// 2. Format với dateStyle
console.log('\n2. Format với dateStyle:')
console.log('Short:', formatDate(new Date(), { dateStyle: 'short' }))
console.log('Medium:', formatDate(new Date(), { dateStyle: 'medium' }))
console.log('Long:', formatDate(new Date(), { dateStyle: 'long' }))
console.log('Full:', formatDate(new Date(), { dateStyle: 'full' }))

// 3. Format với time
console.log('\n3. Format với time:')
console.log(formatDate(new Date(), { dateStyle: 'medium', timeStyle: 'medium' }))

// 4. Format relative time
console.log('\n4. Format relative time:')
const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
console.log(formatDate(oneHourAgo, { relative: true }))
// Output: "1 giờ trước"

// 5. Custom format
console.log('\n5. Custom format:')
console.log(formatDate(new Date(), { format: 'dd/MM/yyyy HH:mm' }))
console.log(formatDate(new Date(), { format: 'yyyy-MM-dd' }))

// 6. Locale khác
console.log('\n6. Locale khác:')
console.log('Vietnamese:', formatDate(new Date(), { locale: 'vi-VN' }))
console.log('English:', formatDate(new Date(), { locale: 'en-US' }))

// 7. Custom formatter
console.log('\n7. Custom formatter:')
console.log(
  formatDate(new Date(), {
    formatter: (date, formatted) => `📅 ${formatted}`
  })
)

// 8. Format DateTime (backward compatible)
console.log('\n8. Format DateTime (backward compatible):')
console.log(formatDateTime(new Date(), 'vi-VN'))

// 9. Format với timezone
console.log('\n9. Format với timezone:')
console.log(formatDate(new Date(), { 
  format: 'YYYY-MM-DD HH:mm:ss',
  timeZone: 'Asia/Ho_Chi_Minh'
}))

console.log('\n✅ Tất cả ví dụ đã chạy thành công!')

