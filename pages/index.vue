<template>
  <div>
    <h1>Welcome to Nuxt 3 Master</h1>
    <p>Counter: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <p class="text-black">12</p>
    <p class="text-test">12</p>
    <p>{{ $t('hello', {name: 'John 1'}) }}</p>
     <n-button type="tertiary">
      Tertiary
    </n-button>
    <n-button type="primary">
      Primary
    </n-button>
    <n-button type="info">
      Info
    </n-button>
  </div>
</template>

<script setup>
// Sử dụng composable
const { count, increment, decrement } = useCounter()

// Set layout
definePageMeta({
  layout: 'default'
})
</script>

<style lang="scss">
.text-test {
  @apply text-brand-primary dark:text-white text-body-bold;
}
</style>

