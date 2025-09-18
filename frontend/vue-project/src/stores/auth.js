import { defineStore } from "pinia";
import api from "@/api/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(token) {
      this.token = token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    },
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.post("/login", { email, password });
        const { token } = response.data;
        this.setToken(token);
        await this.fetchUser();
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || "Erro ao fazer login.";
        throw error;
      }
    },
    async register(name, email, password) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.post("/register", { name, email, password });
        const { token } = response.data;
        this.setToken(token);
        await this.fetchUser();
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || "Erro ao registrar.";
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchProfile() {
      if (!this.token) return;
      try {
        const response = await api.get("/profile");
        this.user = response.data;
        return this.user
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.logout();
        }
        throw error;
      }
    },
    logout() {
      this.setToken(null);
      this.user = null;
      window.location.href = '/login';
    }
  }
})