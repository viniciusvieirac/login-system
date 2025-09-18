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
        console.log('[auth.js] Token salvo no localStorage:', token)
      } else {
        localStorage.removeItem('token')
        console.log('[auth.js] Token removido do localStorage')
      }
    },

    async login(email, password) {
      console.log('[auth.js] Tentando login com:', email)
      this.loading = true
      this.error = null
      try {
        const res = await api.post('/login', { email, password })
        console.log('[auth.js] Resposta login:', res.data)
        const { token } = res.data
        this.setToken(token)
        await this.fetchProfile()
        return res.data
      } catch (err) {
        console.error('[auth.js] Erro no login:', err.response?.data || err.message)
        this.error = err.response?.data?.message || 'Erro ao logar'
        throw err
      } finally {
        this.loading = false
      }
    },

    async register(name, email, password) {
      console.log('[auth.js] Tentando registrar:', name, email)
      this.loading = true
      this.error = null
      try {
        const res = await api.post('/register', { name, email, password })
        console.log('[auth.js] Registro OK, resposta backend:', res.data)
        const { token } = res.data
        this.setToken(token)
        await this.fetchProfile()
        return res.data
      } catch (err) {
        console.error('[auth.js] Erro no registro:', err.response?.data || err.message)
        this.error = err.response?.data?.message || 'Erro ao registrar'
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchProfile() {
      console.log('[auth.js] Buscando perfil do usuário...')
      if (!this.token) {
        console.log('[auth.js] Nenhum token encontrado, não pode buscar perfil')
        return null
      }

      try {
        const res = await api.get('/profile')
        console.log('[auth.js] Perfil carregado:', res.data)
        this.user = res.data.user
        return this.user
      } catch (err) {
        console.error('[auth.js] Erro ao buscar perfil:', err.response?.data || err.message)
        if (err.response?.status === 401) {
          this.logout()
        }
        throw err
      }
    },

    logout() {
      console.log('[auth.js] Logout executado')
      this.setToken(null)
      this.user = null
    },
  },
})
