<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="submit">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Senha"
        required
        minlength="6"
      />
      <button :disabled="loading">
        {{ loading ? "Entrando..." : "Entrar" }}
      </button>
      <button type="button" @click="goRegister">Registre-se</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(null);

async function submit() {
  loading.value = true;
  error.value = null;

  try {
    await authStore.login(email.value, password.value);
    router.push("/profile");
  } catch (err) {
    error.value = err.response?.data?.message || "Erro ao fazer login.";
  } finally {
    loading.value = false;
  }
}

function goRegister() {
  router.push("/register");
}
</script>

<style scoped>
.login {
  max-width: 400px;
  width: 100%;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login h2 {
  text-align: center;
  margin-bottom: 1.8rem;
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.8rem;
}

.login form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.login input {
  padding: 0.9rem 1.2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}

.login input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  background-color: #fff;
}

.login button {
  padding: 0.9rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login button:not(:disabled) {
  background-color: #3498db;
  color: white;
}

.login button:not(:disabled):hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.login button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.login button[type="button"] {
  background-color: #f8f9fa;
  color: #2c3e50;
  border: 1px solid #ddd;
}

.login button[type="button"]:hover {
  background-color: #e9ecef;
}

.login .error {
  color: #e74c3c;
  text-align: center;
  padding: 0.7rem;
  border-radius: 6px;
  background-color: rgba(231, 76, 60, 0.1);
  margin: 0;
}
</style>
