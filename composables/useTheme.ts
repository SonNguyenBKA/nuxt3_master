/**
 * Composable để quản lý theme (dark/light mode)
 * Sử dụng @nuxtjs/color-mode
 * 
 * @example
 * const { colorMode, toggleTheme, setTheme, currentTheme } = useTheme()
 * 
 * // Toggle theme
 * toggleTheme()
 * 
 * // Set theme cụ thể
 * setTheme('dark')
 * setTheme('light')
 * setTheme('system')
 * 
 * // Truy cập preference
 * console.log(colorMode.preference) // 'light' | 'dark' | 'system'
 * console.log(currentTheme.value)   // 'light' | 'dark'
 */
export const useTheme = () => {
  const colorMode = useColorMode()

  /**
   * Toggle giữa dark và light mode
   */
  const toggleTheme = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
  }

  /**
   * Set theme cụ thể
   */
  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    colorMode.preference = theme
  }

  /**
   * Kiểm tra theme hiện tại
   */
  const isDark = computed(() => colorMode.value === 'dark')
  const isLight = computed(() => colorMode.value === 'light')
  const isSystem = computed(() => colorMode.preference === 'system')

  return {
    colorMode,
    toggleTheme,
    setTheme,
    isDark,
    isLight,
    isSystem,
    // Current theme value (cần computed vì value có thể thay đổi)
    currentTheme: computed(() => colorMode.value)
    // Note: preference có thể truy cập qua colorMode.preference
  }
}

