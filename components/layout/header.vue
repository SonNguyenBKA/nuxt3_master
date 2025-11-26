<template>
  <header class="header">
    <nav class="nav">
      <NuxtLink class="logo" to="/">Nuxt 3 Master</NuxtLink>

      <ul class="menu">
        <li v-for="item in menus" :key="item.label" class="menu-item">
          <NuxtLink
            v-if="!item.children"
            :to="item.to"
            class="menu-link"
          >
            {{ item.label }}
          </NuxtLink>

          <n-dropdown
            v-else
            trigger="hover"
            placement="bottom-start"
            :options="toDropdownOptions(item.children)"
            @select="handleMenuSelect"
          >
            <button type="button" class="menu-link has-children" @click="navigateTo(item.to)">
              {{ item.label }}
              <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  d="M5 7l5 5 5-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </n-dropdown>
        </li>
      </ul>
      <LanguageSwitcher />
      <ThemeToggle />
    </nav>
  </header>
</template>

<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'

type MenuItem = {
  label: string
  to: string
  children?: MenuItem[]
}

const router = useRouter()

const menus = ref<MenuItem[]>([
  { label: 'Home', to: '/' },
  {
    label: 'Solutions',
    to: '/solutions',
    children: [
      { label: 'Analytics Platform', to: '/solutions/analytics' },
      { label: 'Automation Tools', to: '/solutions/automation' },
      { label: 'AI Assistants', to: '/solutions/ai' }
    ]
  },
  {
    label: 'Resources',
    to: '/resources',
    children: [
      { label: 'Docs & Guides', to: '/resources/docs' },
      { label: 'Case Studies', to: '/resources/case-studies' },
      { label: 'Webinars', to: '/resources/webinars' }
    ]
  },
  { label: 'Pricing', to: '/pricing' },
  {
    label: 'Example',
    to: '/example',
    children: [
      { label: 'Input', to: '/example/input' },
    ]
  }
])

const toDropdownOptions = (children: MenuItem[] = []): DropdownOption[] =>
  children.map((child) => ({
    label: child.label,
    key: child.to
  }))

const handleMenuSelect = (key: string | number) => {
  if (typeof key === 'string') {
    router.push(key)
  }
}

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: var(--color-bg-secondary, #f9f9fb);
  border-bottom: 1px solid var(--color-border, #ebebf0);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  gap: 2rem;
}

.logo {
  font-weight: 700;
  color: var(--color-text, #14141f);
  text-decoration: none;
  font-size: 1.1rem;
}

.menu {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
  color: var(--color-text, #333);
  text-decoration: none;
  position: relative;
  cursor: pointer;
  transition: color 0.2s ease;
}

.menu-link:hover {
  color: var(--color-primary, #0f62fe);
}

.menu-item {
  position: relative;
}

.has-children {
  background: transparent;
  border: none;
  padding: 0;
  font: inherit;
}

.has-children svg {
  transition: transform 0.2s ease;
}

.menu-item:hover .has-children svg {
  transform: rotate(180deg);
}

.theme-dark .header {
  background-color: var(--color-bg-secondary, #1f1f24);
  border-color: var(--color-border, #2f2f36);
}
</style>