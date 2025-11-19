<template>
  <div class="theme-demo">
    <h1>Theme Demo Page</h1>
    
    <div class="controls">
      <h2>Theme Controls</h2>
      <div class="button-group">
        <button @click="setTheme('light')" :class="{ active: preference === 'light' }">
          Light
        </button>
        <button @click="setTheme('dark')" :class="{ active: preference === 'dark' }">
          Dark
        </button>
        <button @click="setTheme('system')" :class="{ active: preference === 'system' }">
          System
        </button>
        <button @click="toggleTheme">
          Toggle ({{ currentTheme }})
        </button>
      </div>
      
      <ThemeToggle />
    </div>

    <div class="info">
      <p><strong>Current Theme:</strong> {{ currentTheme }}</p>
      <p><strong>Preference:</strong> {{ preference }}</p>
      <p><strong>Is Dark:</strong> {{ isDark }}</p>
      <p><strong>Is Light:</strong> {{ isLight }}</p>
    </div>

    <div class="color-samples">
      <h2>Color Samples</h2>
      <div class="sample bg-primary">Background Primary</div>
      <div class="sample bg-secondary">Background Secondary</div>
      <div class="sample bg-tertiary">Background Tertiary</div>
      <div class="sample text-primary">Text Primary</div>
      <div class="sample text-secondary">Text Secondary</div>
      <div class="sample border-sample">Border Sample</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { 
  colorMode,
  currentTheme, 
  isDark, 
  isLight, 
  toggleTheme, 
  setTheme 
} = useTheme()

// preference có thể truy cập qua colorMode.preference
const preference = colorMode.preference

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.theme-demo {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.controls {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: var(--color-bg-secondary, #f9f9fb);
  border-radius: 0.5rem;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.button-group button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border, #ebebf0);
  background-color: var(--color-bg, #fff);
  color: var(--color-text, #333);
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.button-group button:hover {
  background-color: var(--color-bg-tertiary, #f5f6fb);
}

.button-group button.active {
  background-color: var(--color-primary, #08387a);
  color: white;
  border-color: var(--color-primary, #08387a);
}

.info {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: var(--color-bg-secondary, #f9f9fb);
  border-radius: 0.5rem;
}

.info p {
  margin: 0.5rem 0;
}

.color-samples {
  margin: 2rem 0;
}

.sample {
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 0.25rem;
}

.bg-primary {
  background-color: var(--color-bg, #fff);
}

.bg-secondary {
  background-color: var(--color-bg-secondary, #f9f9fb);
}

.bg-tertiary {
  background-color: var(--color-bg-tertiary, #f5f6fb);
}

.text-primary {
  background-color: var(--color-bg-secondary, #f9f9fb);
  color: var(--color-text, #333);
}

.text-secondary {
  background-color: var(--color-bg-secondary, #f9f9fb);
  color: var(--color-text-secondary, #64646d);
}

.border-sample {
  background-color: var(--color-bg, #fff);
  border: 2px solid var(--color-border, #ebebf0);
}
</style>

