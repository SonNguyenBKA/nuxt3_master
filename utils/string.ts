/**
 * String Utilities - Các hàm xử lý chuỗi có tính mở rộng
 */

export interface TruncateOptions {
  /** Độ dài tối đa */
  length: number
  /** Ký tự thay thế phần bị cắt */
  suffix?: string
  /** Cắt theo từ (word) thay vì ký tự */
  wordBoundary?: boolean
  /** Giữ nguyên HTML tags (nếu có) */
  preserveHtml?: boolean
}

/**
 * Cắt ngắn chuỗi với nhiều tùy chọn
 * 
 * @param text - Chuỗi cần cắt
 * @param options - Tùy chọn
 * @returns Chuỗi đã cắt
 * 
 * @example
 * ```ts
 * truncate('Hello world', { length: 5 }) // "Hello..."
 * truncate('Hello world', { length: 5, wordBoundary: true }) // "Hello..."
 * truncate('Hello world', { length: 8, suffix: '…' }) // "Hello w…"
 * ```
 */
export function truncate(text: string, options: TruncateOptions): string {
  const { length, suffix = '...', wordBoundary = false } = options

  if (!text || text.length <= length) {
    return text
  }

  if (wordBoundary) {
    // Cắt theo từ
    const truncated = text.substring(0, length)
    const lastSpace = truncated.lastIndexOf(' ')
    if (lastSpace > 0) {
      return truncated.substring(0, lastSpace) + suffix
    }
  }

  return text.substring(0, length) + suffix
}

export interface SlugifyOptions {
  /** Ký tự thay thế khoảng trắng */
  separator?: string
  /** Chuyển thành lowercase */
  lowercase?: boolean
  /** Loại bỏ ký tự đặc biệt */
  removeSpecialChars?: boolean
  /** Custom replacement map */
  replacements?: Record<string, string>
}

/**
 * Chuyển chuỗi thành slug (URL-friendly)
 * 
 * @param text - Chuỗi cần chuyển
 * @param options - Tùy chọn
 * @returns Slug string
 * 
 * @example
 * ```ts
 * slugify('Hello World!') // "hello-world"
 * slugify('Xin chào', { separator: '_' }) // "xin_chao"
 * slugify('C++ Programming', { 
 *   replacements: { '+': 'plus' } 
 * }) // "c-plus-programming"
 * ```
 */
export function slugify(text: string, options: SlugifyOptions = {}): string {
  const {
    separator = '-',
    lowercase = true,
    removeSpecialChars = true,
    replacements = {}
  } = options

  let result = text

  // Apply custom replacements
  Object.entries(replacements).forEach(([from, to]) => {
    result = result.replace(new RegExp(from, 'g'), to)
  })

  // Remove special chars nếu cần
  if (removeSpecialChars) {
    result = result.replace(/[^\w\s-]/g, '')
  }

  // Replace spaces với separator
  result = result.replace(/\s+/g, separator)

  // Remove duplicate separators
  result = result.replace(new RegExp(`${separator}+`, 'g'), separator)

  // Trim separators ở đầu/cuối
  result = result.replace(new RegExp(`^${separator}|${separator}$`, 'g'), '')

  // Lowercase nếu cần
  if (lowercase) {
    result = result.toLowerCase()
  }

  return result
}

export interface MaskOptions {
  /** Ký tự dùng để mask */
  maskChar?: string
  /** Số ký tự hiển thị ở đầu */
  startVisible?: number
  /** Số ký tự hiển thị ở cuối */
  endVisible?: number
  /** Mask toàn bộ nếu chuỗi quá ngắn */
  maskAllIfShort?: boolean
}

/**
 * Ẩn một phần chuỗi (dùng cho email, phone, etc.)
 * 
 * @param text - Chuỗi cần mask
 * @param options - Tùy chọn
 * @returns Chuỗi đã mask
 * 
 * @example
 * ```ts
 * mask('john.doe@example.com') // "joh****@example.com"
 * mask('1234567890', { startVisible: 2, endVisible: 2 }) // "12****90"
 * mask('secret', { maskChar: '*' }) // "******"
 * ```
 */
export function mask(text: string, options: MaskOptions = {}): string {
  const {
    maskChar = '*',
    startVisible = 3,
    endVisible = 3,
    maskAllIfShort = true
  } = options

  if (!text) return ''

  const length = text.length
  const totalVisible = startVisible + endVisible

  if (maskAllIfShort && length <= totalVisible) {
    return maskChar.repeat(length)
  }

  if (length <= totalVisible) {
    return text
  }

  const start = text.substring(0, startVisible)
  const end = text.substring(length - endVisible)
  const masked = maskChar.repeat(length - totalVisible)

  return start + masked + end
}

