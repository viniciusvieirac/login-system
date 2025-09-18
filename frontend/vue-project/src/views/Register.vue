<template>
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