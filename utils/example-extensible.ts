/**
 * VÍ DỤ: Cách viết hàm utils có tính mở rộng (Extensible)
 * 
 * Nguyên tắc:
 * 1. Options Object Pattern - Dùng object thay vì nhiều tham số
 * 2. TypeScript Types rõ ràng
 * 3. Default values hợp lý
 * 4. Extensible với callbacks/plugins
 * 5. JSDoc comments đầy đủ
 * 6. Error handling
 * 7. Validation
 */

// ============================================
// VÍ DỤ 1: Debounce Function (Cơ bản → Mở rộng)
// ============================================

/**
 * ❌ CÁCH VIẾT KHÔNG MỞ RỘNG (Nhiều tham số, khó extend)
 */
function debounceBad(
  func: Function,
  delay: number,
  immediate?: boolean,
  maxWait?: number
) {
  // Khó thêm tính năng mới, phải thay đổi signature
}

/**
 * ✅ CÁCH VIẾT MỞ RỘNG (Options Object Pattern)
 */

// 1. Định nghĩa type cho options
export interface DebounceOptions {
  /** Thời gian delay (ms) */
  delay?: number
  /** Gọi ngay lần đầu, không đợi delay */
  immediate?: boolean
  /** Thời gian tối đa phải gọi (ms) - dù có debounce */
  maxWait?: number
  /** Callback khi bị cancel */
  onCancel?: () => void
  /** Callback trước khi gọi hàm */
  onBeforeCall?: () => void
  /** Callback sau khi gọi hàm */
  onAfterCall?: (result: unknown) => void
}

// 2. Default values
const DEFAULT_DEBOUNCE_OPTIONS: Required<Omit<DebounceOptions, 'onCancel' | 'onBeforeCall' | 'onAfterCall'>> = {
  delay: 300,
  immediate: false,
  maxWait: undefined
}

/**
 * Debounce function với nhiều tùy chọn mở rộng
 * 
 * @param fn - Hàm cần debounce
 * @param options - Các tùy chọn
 * @returns Hàm đã được debounce và hàm cancel
 * 
 * @example
 * ```ts
 * const debounced = debounce((value) => {
 *   console.log('Search:', value)
 * }, { delay: 500, immediate: true })
 * 
 * debounced('hello')
 * debounced.cancel() // Hủy pending call
 * ```
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  options: DebounceOptions = {}
): T & { cancel: () => void; flush: () => void } {
  // Merge với default options
  const opts = {
    ...DEFAULT_DEBOUNCE_OPTIONS,
    ...options
  }

  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let maxWaitId: ReturnType<typeof setTimeout> | null = null
  let lastCallTime: number | null = null
  let lastArgs: Parameters<T> | null = null
  let isImmediateCalled = false

  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    if (maxWaitId) {
      clearTimeout(maxWaitId)
      maxWaitId = null
    }
    lastCallTime = null
    lastArgs = null
    isImmediateCalled = false
    options.onCancel?.()
  }

  const flush = () => {
    if (lastArgs && timeoutId) {
      cancel()
      const result = fn(...lastArgs)
      options.onAfterCall?.(result)
      return result
    }
  }

  const debounced = ((...args: Parameters<T>) => {
    lastArgs = args
    const now = Date.now()

    // Immediate call (chỉ lần đầu)
    if (opts.immediate && !isImmediateCalled) {
      isImmediateCalled = true
      options.onBeforeCall?.()
      const result = fn(...args)
      options.onAfterCall?.(result)
      return result
    }

    // Clear previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // Max wait logic
    if (opts.maxWait && (!lastCallTime || now - lastCallTime >= opts.maxWait)) {
      if (maxWaitId) {
        clearTimeout(maxWaitId)
      }
      maxWaitId = setTimeout(() => {
        if (lastArgs) {
          options.onBeforeCall?.()
          const result = fn(...lastArgs)
          options.onAfterCall?.(result)
          cancel()
        }
      }, opts.maxWait)
    }

    lastCallTime = now

    // Set new timeout
    timeoutId = setTimeout(() => {
      options.onBeforeCall?.()
      const result = fn(...args)
      options.onAfterCall?.(result)
      cancel()
    }, opts.delay)
  }) as T & { cancel: () => void; flush: () => void }

  debounced.cancel = cancel
  debounced.flush = flush

  return debounced
}

// ============================================
// VÍ DỤ 2: Format Currency (Với i18n support)
// ============================================

export interface FormatCurrencyOptions {
  /** Mã tiền tệ (ISO 4217) */
  currency?: string
  /** Locale code */
  locale?: string
  /** Số chữ số thập phân */
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  /** Hiển thị ký hiệu tiền tệ */
  showSymbol?: boolean
  /** Custom formatter function */
  formatter?: (value: number, formatted: string) => string
}

const DEFAULT_CURRENCY_OPTIONS: Required<Omit<FormatCurrencyOptions, 'formatter'>> = {
  currency: 'VND',
  locale: 'vi-VN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  showSymbol: true
}

/**
 * Format số tiền theo locale và currency
 * 
 * @param value - Giá trị số tiền
 * @param options - Tùy chọn format
 * @returns Chuỗi đã format
 * 
 * @example
 * ```ts
 * formatCurrency(1000000) // "1.000.000 ₫"
 * formatCurrency(1000000, { currency: 'USD', locale: 'en-US' }) // "$1,000,000"
 * formatCurrency(1000000, { 
 *   formatter: (val, formatted) => `${formatted} (${val} đồng)` 
 * }) // "1.000.000 ₫ (1000000 đồng)"
 * ```
 */
export function formatCurrency(
  value: number,
  options: FormatCurrencyOptions = {}
): string {
  // Validation
  if (typeof value !== 'number' || isNaN(value)) {
    throw new TypeError('Value must be a valid number')
  }

  // Merge options
  const opts = {
    ...DEFAULT_CURRENCY_OPTIONS,
    ...options
  }

  // Format với Intl.NumberFormat
  const formatter = new Intl.NumberFormat(opts.locale, {
    style: opts.showSymbol ? 'currency' : 'decimal',
    currency: opts.currency,
    minimumFractionDigits: opts.minimumFractionDigits,
    maximumFractionDigits: opts.maximumFractionDigits
  })

  let formatted = formatter.format(value)

  // Apply custom formatter nếu có
  if (opts.formatter) {
    formatted = opts.formatter(value, formatted)
  }

  return formatted
}

// ============================================
// VÍ DỤ 3: API Request Wrapper (Với retry, timeout, etc.)
// ============================================

export interface ApiRequestOptions {
  /** Timeout (ms) */
  timeout?: number
  /** Số lần retry */
  retries?: number
  /** Delay giữa các lần retry (ms) */
  retryDelay?: number
  /** Function kiểm tra có nên retry không */
  shouldRetry?: (error: Error) => boolean
  /** Callback trước khi request */
  onBeforeRequest?: (url: string) => void
  /** Callback sau khi request thành công */
  onSuccess?: (data: unknown) => void
  /** Callback khi request lỗi */
  onError?: (error: Error) => void
  /** Headers tùy chỉnh */
  headers?: Record<string, string>
}

const DEFAULT_API_OPTIONS: Required<Omit<ApiRequestOptions, 'shouldRetry' | 'onBeforeRequest' | 'onSuccess' | 'onError' | 'headers'>> = {
  timeout: 10000,
  retries: 3,
  retryDelay: 1000
}

/**
 * Wrapper cho API request với retry, timeout, và callbacks
 * 
 * @param url - URL endpoint
 * @param options - Tùy chọn request
 * @returns Promise với response data
 * 
 * @example
 * ```ts
 * const data = await apiRequest('/api/users', {
 *   retries: 5,
 *   timeout: 5000,
 *   onSuccess: (data) => console.log('Success:', data),
 *   shouldRetry: (error) => error.message.includes('timeout')
 * })
 * ```
 */
export async function apiRequest<T = unknown>(
  url: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const opts = {
    ...DEFAULT_API_OPTIONS,
    ...options,
    shouldRetry: options.shouldRetry || ((error: Error) => {
      // Default: retry nếu là network error hoặc timeout
      return error.message.includes('timeout') || 
             error.message.includes('network') ||
             error.message.includes('ECONNREFUSED')
    })
  }

  let lastError: Error | null = null

  for (let attempt = 0; attempt <= opts.retries; attempt++) {
    try {
      opts.onBeforeRequest?.(url)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), opts.timeout)

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...opts.headers
        },
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json() as T
      opts.onSuccess?.(data)
      return data

    } catch (error) {
      lastError = error as Error
      opts.onError?.(lastError)

      // Kiểm tra có nên retry không
      if (attempt < opts.retries && opts.shouldRetry?.(lastError)) {
        await new Promise(resolve => setTimeout(resolve, opts.retryDelay))
        continue
      }

      throw lastError
    }
  }

  throw lastError || new Error('Request failed')
}

// ============================================
// VÍ DỤ 4: Storage Helper (Với encryption, validation)
// ============================================

export interface StorageOptions {
  /** Tên key trong storage */
  key: string
  /** Storage instance (localStorage, sessionStorage, custom) */
  storage?: Storage
  /** Encrypt data trước khi lưu */
  encrypt?: boolean
  /** Validate data trước khi lưu */
  validator?: (value: unknown) => boolean
  /** Transform data trước khi lưu */
  serialize?: (value: unknown) => string
  /** Transform data sau khi đọc */
  deserialize?: (value: string) => unknown
  /** Default value nếu không tìm thấy */
  defaultValue?: unknown
  /** Callback khi set thành công */
  onSet?: (key: string, value: unknown) => void
  /** Callback khi get thành công */
  onGet?: (key: string, value: unknown) => void
}

/**
 * Storage helper với nhiều tính năng mở rộng
 * 
 * @example
 * ```ts
 * const storage = createStorage({
 *   key: 'user-data',
 *   encrypt: true,
 *   validator: (val) => typeof val === 'object',
 *   defaultValue: {}
 * })
 * 
 * storage.set({ name: 'John' })
 * const data = storage.get()
 * storage.remove()
 * ```
 */
export function createStorage<T = unknown>(options: StorageOptions) {
  const {
    key,
    storage = typeof window !== 'undefined' ? localStorage : undefined,
    encrypt = false,
    validator,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    defaultValue,
    onSet,
    onGet
  } = options

  if (!storage) {
    throw new Error('Storage is not available')
  }

  // Simple encryption (trong thực tế dùng crypto library)
  const encryptData = (data: string): string => {
    if (!encrypt) return data
    // Giả lập encryption (thực tế dùng crypto)
    return btoa(data)
  }

  const decryptData = (data: string): string => {
    if (!encrypt) return data
    // Giả lập decryption
    return atob(data)
  }

  return {
    /**
     * Get value from storage
     */
    get(): T {
      try {
        const raw = storage.getItem(key)
        if (!raw) {
          return defaultValue as T
        }

        const decrypted = decryptData(raw)
        const value = deserialize(decrypted) as T

        // Validate nếu có
        if (validator && !validator(value)) {
          console.warn(`Invalid value for key "${key}"`)
          return defaultValue as T
        }

        onGet?.(key, value)
        return value
      } catch (error) {
        console.error(`Error getting storage key "${key}":`, error)
        return defaultValue as T
      }
    },

    /**
     * Set value to storage
     */
    set(value: T): void {
      try {
        // Validate nếu có
        if (validator && !validator(value)) {
          throw new Error(`Invalid value for key "${key}"`)
        }

        const serialized = serialize(value)
        const encrypted = encryptData(serialized)
        storage.setItem(key, encrypted)
        onSet?.(key, value)
      } catch (error) {
        console.error(`Error setting storage key "${key}":`, error)
        throw error
      }
    },

    /**
     * Remove value from storage
     */
    remove(): void {
      storage.removeItem(key)
    },

    /**
     * Check if key exists
     */
    has(): boolean {
      return storage.getItem(key) !== null
    }
  }
}

// ============================================
// TÓM TẮT: Best Practices
// ============================================

/**
 * ✅ CÁCH VIẾT HÀM UTILS MỞ RỘNG:
 * 
 * 1. OPTIONS OBJECT PATTERN
 *    - Dùng object thay vì nhiều tham số
 *    - Dễ thêm tính năng mới mà không breaking change
 * 
 * 2. TYPE SAFETY
 *    - Định nghĩa interface/type rõ ràng
 *    - Dùng generic types khi cần
 * 
 * 3. DEFAULT VALUES
 *    - Cung cấp default hợp lý
 *    - Tách riêng DEFAULT_OPTIONS constant
 * 
 * 4. EXTENSIBILITY
 *    - Hỗ trợ callbacks (onSuccess, onError, etc.)
 *    - Hỗ trợ custom functions (formatter, validator, etc.)
 * 
 * 5. ERROR HANDLING
 *    - Validate input
 *    - Throw errors rõ ràng
 *    - Try-catch khi cần
 * 
 * 6. DOCUMENTATION
 *    - JSDoc comments đầy đủ
 *    - Ví dụ sử dụng
 *    - Mô tả parameters và return
 * 
 * 7. COMPOSABILITY
 *    - Hàm nhỏ, tập trung vào 1 việc
 *    - Có thể kết hợp với nhau
 */

