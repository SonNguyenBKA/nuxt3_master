<template>
  <div class="not-found">
    <h1>404 - Page not found</h1>
    <p>
      The page you are looking for doesn’t exist or has been moved.
    </p>

    <n-button type="primary" size="large" @click="goHome">
      Go back home
    </n-button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const goHome = () => {
  router.push('/')
}

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.not-found {
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
}

p {
  max-width: 480px;
  color: var(--color-text-secondary, #555);
}
</style>


