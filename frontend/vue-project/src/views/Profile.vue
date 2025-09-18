<template>
  <div class="profile">
    <h2>Perfil</h2>
    <div v-if="auth.user">
      <p color="red"><strong>Nome:</strong> {{ auth.user.name }}</p>
      <p color="blue"><strong>Email:</strong> {{ auth.user.email }}</p>
      <button @click="logout">Sair</button>
    </div>
    <div v-else>Carregando...</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

onMounted(async () => {
  if (!auth.user) {
    try {
      const profile = await auth.fetchProfile()
    } catch (err) {
      router.push('/login')
    }
  }
})

function logout() {
  auth.logout()
  router.push('/login')
}
</script>
