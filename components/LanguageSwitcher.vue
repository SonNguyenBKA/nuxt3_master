<template>
  <div class="language-switcher">
    <button
      v-for="lang in availableLocales"
      :key="lang"
      @click="setLocale(lang)"
      :class="['lang-btn', { active: locale === lang }]"
      :aria-label="`Switch to ${lang.toUpperCase()}`"
    >
      {{ lang.toUpperCase() }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, availableLocales, setLocale } = useLanguage()
</script>

<style scoped>
.language-switcher {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
}

.lang-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border, #ebebf0);
  background-color: var(--color-bg, #ffffff);
  color: var(--color-text, #333);
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.lang-btn:hover {
  background-color: var(--color-bg-secondary, #f9f9fb);
  border-color: var(--color-border-hover, #d1d1d6);
}

.lang-btn.active {
  background-color: var(--color-primary, #007bff);
  color: #ffffff;
  border-color: var(--color-primary, #007bff);
}

.theme-dark .lang-btn {
  background-color: var(--color-bg, #1a1a1a);
  color: var(--color-text, #fff);
  border-color: var(--color-border, #515158);
}

.theme-dark .lang-btn:hover {
  background-color: var(--color-bg-secondary, #2a2a2a);
  border-color: var(--color-border-hover, #6a6a6f);
}

.theme-dark .lang-btn.active {
  background-color: var(--color-primary, #007bff);
  color: #ffffff;
}
</style>

