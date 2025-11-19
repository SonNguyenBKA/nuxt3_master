<template>
  <div class="about-page">
    <h1>About Nuxt 3 Master</h1>
    <p>This page now showcases Naive UI components wired up in Nuxt 3.</p>

    <n-card title="Naive UI quick demo" size="large" class="demo-card">
      <n-space vertical size="large">
        <n-input
          v-model:value="name"
          placeholder="Enter your name"
          round
        />

        <n-select
          v-model:value="favoriteStack"
          :options="stackOptions"
          filterable
          placeholder="Pick your favorite stack"
        />

        <n-button type="primary" size="large" round @click="handleNotify">
          Say hello
        </n-button>
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const favoriteStack = ref<string | null>(null)

const stackOptions = [
  { label: 'Nuxt 3 + Naive UI', value: 'nuxt-naive' },
  { label: 'Nuxt 3 + PrimeVue', value: 'nuxt-prime' },
  { label: 'Nuxt 3 + Element Plus', value: 'nuxt-element' },
]

const { $naiveMessage } = useNuxtApp()

const handleNotify = () => {
  const displayName = name.value?.trim() || 'friend'
  $naiveMessage?.success(
    `Hi ${displayName}!${favoriteStack.value ? ` (${favoriteStack.value})` : ''}`
  )
}

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.demo-card {
  max-width: 480px;
}
</style>

