/**
 * Composable để quản lý ngôn ngữ (i18n)
 * - Switch ngôn ngữ
 * - Lưu ngôn ngữ vào localStorage
 * - Đọc ngôn ngữ từ localStorage
 */

import { useI18n } from 'vue-i18n'

const STORAGE_KEY = 'nuxt-language'

export const useLanguage = () => {
  // Lấy instance i18n
  const { locale, availableLocales } = useI18n()

  /**
   * Lấy ngôn ngữ từ localStorage hoặc fallback về 'en'
   */
  const getStoredLocale = (): string => {
    if (typeof window === 'undefined') return 'en'
    
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && availableLocales.includes(stored)) {
      return stored
    }
    return 'en'
  }

  /**
   * Lưu ngôn ngữ vào localStorage
   */
  const saveLocale = (lang: string) => {
    if (typeof window === 'undefined') return
    
    if (availableLocales.includes(lang)) {
      localStorage.setItem(STORAGE_KEY, lang)
    }
  }

  /**
   * Switch ngôn ngữ và lưu vào localStorage
   * @param lang - Mã ngôn ngữ ('en', 'vi', ...)
   */
  const setLocale = (lang: string) => {
    if (availableLocales.includes(lang)) {
      locale.value = lang
      saveLocale(lang)
    }
  }

  /**
   * Toggle giữa các ngôn ngữ có sẵn
   */
  const toggleLocale = () => {
    const currentIndex = availableLocales.indexOf(locale.value)
    const nextIndex = (currentIndex + 1) % availableLocales.length
    setLocale(availableLocales[nextIndex])
  }

  /**
   * Khởi tạo: đọc ngôn ngữ từ localStorage và set vào i18n
   */
  const initLocale = () => {
    const storedLocale = getStoredLocale()
    if (storedLocale && storedLocale !== locale.value) {
      locale.value = storedLocale
    }
  }

  return {
    locale: readonly(locale),
    availableLocales,
    setLocale,
    toggleLocale,
    initLocale,
    getStoredLocale
  }
}

