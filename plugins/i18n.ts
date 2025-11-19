import { createI18n } from 'vue-i18n'

import en from '../locales/en.json'
import vi from '../locales/vi.json'

// Lấy ngôn ngữ từ localStorage hoặc fallback về 'en'
const getInitialLocale = (): string => {
    if (typeof window === 'undefined') return 'en'
    
    const STORAGE_KEY = 'nuxt-language'
    const stored = localStorage.getItem(STORAGE_KEY)
    const availableLocales = ['en', 'vi']
    
    if (stored && availableLocales.includes(stored)) {
        return stored
    }
    return 'en'
}

export default defineNuxtPlugin(({ vueApp }) => {
    const initialLocale = getInitialLocale()
    
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: initialLocale,
        fallbackLocale: 'en',
        messages: {
            en,
            vi
        }
    })

    vueApp.use(i18n)
})