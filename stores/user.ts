import { defineStore } from 'pinia'

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false
  }),

  getters: {
    userName: (state) => state.user?.name || 'Guest',
    userEmail: (state) => state.user?.email || '',
    hasUser: (state) => state.user !== null
  },

  actions: {
    setUser(user: User) {
      this.user = user
      this.isAuthenticated = true
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
    },

    updateUser(updates: Partial<User>) {
      if (this.user) {
        this.user = { ...this.user, ...updates }
      }
    }
  },

  // Persist state (optional - cần cài @pinia-plugin-persistedstate nếu muốn)
  persist: false
})

