<!--
  File ví dụ về cách sử dụng useApi composable
  Bạn có thể xóa file này sau khi đã hiểu cách dùng
-->

<template>
  <div>
    <h2>API Usage Examples</h2>
    
    <!-- GET Example -->
    <div>
      <h3>GET Request</h3>
      <button @click="fetchUsers">Fetch Users</button>
      <div v-if="users.length">
        <ul>
          <li v-for="user in users" :key="user.id">
            {{ user.name }} - {{ user.email }}
          </li>
        </ul>
      </div>
    </div>

    <!-- POST Example -->
    <div>
      <h3>POST Request</h3>
      <input v-model="newUser.name" placeholder="Name" />
      <input v-model="newUser.email" placeholder="Email" />
      <button @click="createUser">Create User</button>
    </div>

    <!-- Upload Example -->
    <div>
      <h3>Upload File</h3>
      <input type="file" @change="handleFileChange" />
      <button @click="uploadFile" :disabled="!selectedFile">Upload</button>
      <div v-if="uploadProgress > 0">
        Progress: {{ uploadProgress }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types'

const { get, post, upload } = useApi()

// State
const users = ref<User[]>([])
const newUser = ref({ name: '', email: '' })
const selectedFile = ref<File | null>(null)
const uploadProgress = ref(0)

// GET Example
const fetchUsers = async () => {
  try {
    const response = await get<User[]>('/users')
    users.value = response
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

// POST Example
const createUser = async () => {
  try {
    const response = await post<User>('/users', newUser.value)
    console.log('User created:', response)
    // Reset form
    newUser.value = { name: '', email: '' }
    // Refresh users list
    await fetchUsers()
  } catch (error) {
    console.error('Error creating user:', error)
  }
}

// Upload Example
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

const uploadFile = async () => {
  if (!selectedFile.value) return

  try {
    const response = await upload('/upload', selectedFile.value, (progressEvent) => {
      if (progressEvent.total) {
        uploadProgress.value = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
      }
    })
    console.log('File uploaded:', response)
    uploadProgress.value = 0
    selectedFile.value = null
  } catch (error) {
    console.error('Error uploading file:', error)
  }
}
</script>

