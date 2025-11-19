/**
 * Composable để tạo hiệu ứng circle spread khi chuyển theme
 * Sử dụng View Transition API (giống lightswind.com/components/toggle-theme)
 * 
 * View Transition API là API mới của browser, mượt mà hơn và native hơn
 * 
 * @example
 * const { triggerTransition } = useThemeTransition()
 * 
 * // Khi toggle theme
 * triggerTransition(buttonRef, () => {
 *   toggleTheme()
 * })
 */

export const useThemeTransition = () => {
  /**
   * Kiểm tra browser có support View Transition API không
   */
  const supportsViewTransition = (): boolean => {
    return typeof document !== 'undefined' && 'startViewTransition' in document
  }

  /**
   * Trigger circle spread animation khi chuyển theme
   * @param buttonElement - Element của button (để tính toán vị trí)
   * @param callback - Function để toggle theme
   * @param duration - Thời gian animation (ms), default 400
   */
  const triggerTransition = async (
    buttonElement: HTMLElement | null,
    callback: () => void,
    duration: number = 400
  ) => {
    // Nếu browser không support View Transition API, chỉ toggle theme bình thường
    if (!supportsViewTransition() || !buttonElement) {
      callback()
      return
    }

    // Sử dụng View Transition API
    const transition = document.startViewTransition(() => {
      // Trong callback này, thay đổi theme
      callback()
    })

    // Đợi transition ready
    await transition.ready

    // Tính toán vị trí và kích thước từ button
    const { top, left, width, height } = buttonElement.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2

    // Tính maxRadius để phủ toàn màn hình
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    // Animate clip-path trên ::view-transition-new(root)
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }

  return {
    triggerTransition,
    supportsViewTransition,
  }
}
