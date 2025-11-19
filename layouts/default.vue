<template>
  <n-config-provider :theme="naiveTheme">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <n-global-style />
            <div>
             <layout-header />
              <main>
                <slot />
              </main> layout-footer
            </div>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  darkTheme,
  NConfigProvider,
  NDialogProvider,
  NGlobalStyle,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider
} from 'naive-ui'

const colorMode = useColorMode()
const naiveTheme = computed(() =>
  colorMode.value === 'dark' ? darkTheme : null
)
</script>

<style scoped>
header {
  padding: 1rem;
  background-color: var(--color-bg-secondary, #f9f9fb);
  border-bottom: 1px solid var(--color-border, #ebebf0);
}

nav {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

nav a {
  text-decoration: none;
  color: var(--color-text, #333);
  font-weight: 500;
  transition: color 0.2s;
}

nav a:hover {
  color: var(--color-primary, #007bff);
}

.controls-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-left: auto;
}

main {
  min-height: calc(100vh - 200px);
  padding: 2rem;
  background-color: var(--color-bg, #fff);
  color: var(--color-text, #333);
}

footer {
  padding: 1rem;
  text-align: center;
  background-color: var(--color-bg-secondary, #f9f9fb);
  border-top: 1px solid var(--color-border, #ebebf0);
  color: var(--color-text, #333);
}
</style>

