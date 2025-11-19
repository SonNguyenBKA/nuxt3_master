/**
 * Date Formatting Utilities - Các hàm format ngày tháng có tính mở rộng
 * Sử dụng dayjs để xử lý date
 */

import dayjs, { type Dayjs } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/vi'
import 'dayjs/locale/en'

// Extend dayjs với các plugin
dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

// Map locale codes
const localeMap: Record<string, string> = {
  'vi-VN': 'vi',
  'vi': 'vi',
  'en-US': 'en',
  'en': 'en'
}

export interface FormatDateOptions {
  /** Locale code (vi-VN, en-US, etc.) */
  locale?: string
  /** Format style: 'short', 'medium', 'long', 'full' */
  dateStyle?: 'short' | 'medium' | 'long' | 'full'
  /** Format style cho time */
  timeStyle?: 'short' | 'medium' | 'long' | 'full'
  /** Custom format string (dd/MM/yyyy, etc.) */
  format?: string
  /** Timezone */
  timeZone?: string
  /** Hiển thị thời gian tương đối (2 giờ trước, etc.) */
  relative?: boolean
  /** Custom formatter function */
  formatter?: (date: Date, formatted: string) => string
}

const DEFAULT_FORMAT_OPTIONS: Required<Omit<FormatDateOptions, 'format' | 'timeZone' | 'formatter'>> = {
  locale: 'vi-VN',
  dateStyle: 'medium',
  timeStyle: 'medium',
  relative: false
}

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
 * formatDate(new Date(), { relative: true }) // "vừa xong" hoặc "2 giờ trước"
 * formatDate(new Date(), { 
 *   formatter: (date, formatted) => `📅 ${formatted}` 
 * }) // "📅 19/11/2025"
 * ```
 */
export function formatDate(date: Date | string | number,  options: FormatDateOptions = {}): string {
  // Validation
  if (!date) {
    throw new TypeError('Date is required')
  }

  const opts = {
    ...DEFAULT_FORMAT_OPTIONS,
    ...options
  }

  // Set locale cho dayjs
  const dayjsLocale = localeMap[opts.locale] || 'vi'
  dayjs.locale(dayjsLocale)

  // Parse date với dayjs
  let dayjsDate: Dayjs
  try {
    dayjsDate = dayjs(date)
    if (!dayjsDate.isValid()) {
      throw new TypeError('Invalid date')
    }
  } catch (error) {
    throw new TypeError('Invalid date')
  }

  // Relative time (2 giờ trước, vừa xong, etc.)
  if (opts.relative) {
    return formatRelativeTime(dayjsDate)
  }

  // Custom format string
  if (opts.format) {
    return formatCustom(dayjsDate, opts.format, opts)
  }

  // Standard format dựa trên dateStyle và timeStyle
  let formatted = formatWithStyle(dayjsDate, opts)

  // Apply custom formatter nếu có
  if (opts.formatter) {
    formatted = opts.formatter(dayjsDate.toDate(), formatted)
  }

  return formatted
}

/**
 * Format date với time (backward compatible)
 * 
 * @param date - Date object hoặc string
 * @param locale - Locale code
 * @returns Chuỗi đã format
 */
export function formatDateTime(
  date: Date | string,
  locale: string = 'vi-VN'
): string {
  return formatDate(date, {
    locale,
    dateStyle: 'medium',
    timeStyle: 'medium'
  })
}

/**
 * Format relative time (2 giờ trước, vừa xong, etc.)
 * Sử dụng dayjs relativeTime plugin
 */
function formatRelativeTime(date: Dayjs): string {
  const now = dayjs()
  const diff = now.diff(date, 'second')

  // Nếu quá 7 ngày thì format bình thường
  if (Math.abs(diff) > 7 * 24 * 60 * 60) {
    return formatDate(date.toDate(), { dateStyle: 'short' })
  }

  // Sử dụng dayjs relativeTime
  return date.fromNow()
}

/**
 * Format với custom format string
 * Sử dụng dayjs format tokens
 */
function formatCustom(
  date: Dayjs,
  format: string,
  options: FormatDateOptions
): string {
  // Convert format tokens từ custom sang dayjs format
  // dd -> DD, MM -> MM, yyyy -> YYYY, etc.
  const dayjsFormat = format
    .replace(/dd/g, 'DD')      // Day with leading zero
    .replace(/d/g, 'D')        // Day without leading zero
    .replace(/MM/g, 'MM')      // Month with leading zero (giữ nguyên)
    .replace(/M/g, 'M')        // Month without leading zero
    .replace(/yyyy/g, 'YYYY')  // Full year
    .replace(/yy/g, 'YY')      // 2-digit year
    .replace(/HH/g, 'HH')      // 24-hour format with leading zero (giữ nguyên)
    .replace(/H/g, 'H')        // 24-hour format without leading zero
    .replace(/hh/g, 'hh')      // 12-hour format with leading zero (giữ nguyên)
    .replace(/h/g, 'h')        // 12-hour format without leading zero
    .replace(/mm/g, 'mm')      // Minutes with leading zero (giữ nguyên)
    .replace(/m/g, 'm')        // Minutes without leading zero
    .replace(/ss/g, 'ss')      // Seconds with leading zero (giữ nguyên)
    .replace(/s/g, 's')        // Seconds without leading zero
    .replace(/tt/g, 'A')       // AM/PM uppercase
    .replace(/t/g, 'a')        // am/pm lowercase

  return date.format(dayjsFormat)
}

/**
 * Format với dateStyle và timeStyle
 */
function formatWithStyle(
  date: Dayjs,
  options: FormatDateOptions
): string {
  const { dateStyle, timeStyle, timeZone } = options

  // Map dateStyle và timeStyle sang dayjs format
  const dateFormats: Record<string, string> = {
    short: 'D/M/YYYY',
    medium: 'D MMM YYYY',
    long: 'D MMMM YYYY',
    full: 'dddd, D MMMM YYYY'
  }

  const timeFormats: Record<string, string> = {
    short: 'HH:mm',
    medium: 'HH:mm:ss',
    long: 'HH:mm:ss',
    full: 'HH:mm:ss'
  }

  let format = ''

  if (dateStyle) {
    format = dateFormats[dateStyle] || dateFormats.medium
  }

  if (timeStyle) {
    const timeFormat = timeFormats[timeStyle] || timeFormats.medium
    format = format ? `${format} ${timeFormat}` : timeFormat
  }

  // Apply timezone nếu có
  if (timeZone) {
    return date.tz(timeZone).format(format)
  }

  return date.format(format)
}

