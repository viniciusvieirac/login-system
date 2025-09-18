<template>
  <div class="register-container">
    <div class="register">
      <h2>Cadastro</h2>
      <form @submit.prevent="submit">
        <input v-model="name" placeholder="Nome" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Senha (6+)" required minlength="6" />
        <button :disabled="loading">{{ loading ? 'Cadastrando...' : 'Cadastrar' }}</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

async function submit() {
  loading.value = true
  error.value = null

  try {
    await authStore.register(name.value, email.value, password.value)
    await authStore.login(email.value, password.value)
    router.push('/profile')
  } catch (err) {
    error.value = err.response?.data?.message || 'Erro ao registrar'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 1rem;
}

.register {
  max-width: 400px;
  width: 100%;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.register h2 {
  text-align: center;
  margin-bottom: 1.8rem;
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.8rem;
}

.register form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.register input {
  padding: 0.9rem 1.2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}

.register input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  background-color: #fff;
}

.register button {
  padding: 0.9rem 1.2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.register button:not(:disabled) {
  background-color: #2ecc71;
  color: white;
}

.register button:not(:disabled):hover {
  background-color: #27ae60;
  transform: translateY(-2px);
}

.register button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.register .error {
  color: #e74c3c;
  text-align: center;
  padding: 0.7rem;
  border-radius: 6px;
  background-color: rgba(231, 76, 60, 0.1);
  margin: 0;
}
</style>