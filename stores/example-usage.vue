<!--
  File này chỉ là ví dụ về cách sử dụng Pinia stores
  Bạn có thể xóa file này sau khi đã hiểu cách dùng
-->

<template>
  <div>
    <!-- Sử dụng Counter Store -->
    <div>
      <h2>Counter Store Example</h2>
      <p>Count: {{ counterStore.count }}</p>
      <p>Double: {{ counterStore.doubleCount }}</p>
      <p>Is Even: {{ counterStore.isEven ? 'Yes' : 'No' }}</p>
      <button @click="counterStore.increment">+</button>
      <button @click="counterStore.decrement">-</button>
      <button @click="counterStore.reset">Reset</button>
    </div>

    <!-- Sử dụng User Store -->
    <div>
      <h2>User Store Example</h2>
      <p>User: {{ userStore.userName }}</p>
      <p>Email: {{ userStore.userEmail }}</p>
      <p>Authenticated: {{ userStore.isAuthenticated ? 'Yes' : 'No' }}</p>
      <button @click="login">Login</button>
      <button @click="userStore.logout">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import stores - Nuxt tự động import từ thư mục stores/
const counterStore = useCounterStore()
const userStore = useUserStore()

// Actions
const login = () => {
  userStore.setUser({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
  })
}
</script>

