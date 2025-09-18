// src/stores/auth.js
import { defineStore } from 'pinia'
import api from '../api/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setToken(token) {
      this.token = token
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    },

    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const res = await api.post('/login', { email, password })
        const { token } = res.data
        this.setToken(token)
        await this.fetchProfile()
        return res.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao logar'
        throw err
      } finally {
        this.loading = false
      }
    },

    async register(name, email, password) {
      this.loading = true
      this.error = null
      try {
        const res = await api.post('/register', { name, email, password })
        const { token } = res.data
        this.setToken(token)
        await this.fetchProfile()
        return res.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao registrar'
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchProfile() {
      if (!this.token) {
        return null
      }

      try {
        const res = await api.get('/profile')
        this.user = res.data.user
        return this.user
      } catch (err) {
        if (err.response?.status === 401) {
          this.logout()
        }
        throw err
      }
    },

    logout() {
      this.setToken(null)
      this.user = null
    },
  },
})
