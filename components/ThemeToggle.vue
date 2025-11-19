<template>
  <button
    ref="buttonRef"
    @click="handleToggle"
    :aria-label="`Switch to ${colorMode.preference === 'dark' ? 'light' : 'dark'} mode`"
    class="theme-toggle"
    :title="`Current: ${colorMode.preference}`"
  >
    <!-- Sun icon (light mode) -->
    <svg
      v-if="colorMode.preference === 'dark'"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="icon"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    <!-- Moon icon (dark mode) -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="icon"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const { triggerTransition } = useThemeTransition()

// Ref để lấy vị trí button
const buttonRef = ref<HTMLButtonElement | null>(null)

const toggleTheme = () => {
  // Toggle giữa light và dark
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

const handleToggle = async () => {
  // Trigger circle spread animation với View Transition API
  await triggerTransition(buttonRef.value, toggleTheme, 400)
}
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  color: var(--Text-Default-Primary, #333);
}

.theme-toggle:hover {
  background-color: var(--Background-Default-Secondary, #f9f9fb);
}

.theme-dark .theme-toggle {
  color: var(--Text-Inverse-Primary, #fff);
}

.theme-dark .theme-toggle:hover {
  background-color: var(--Background-Inverse-Tertiary, #515158);
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>

