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
  console.log('[Profile.vue] auth.user inicial:', auth.user)
  if (!auth.user) {
    try {
      const profile = await auth.fetchProfile()
      console.log('[Profile.vue] fetchProfile retornou:', profile)
    } catch (err) {
      console.error('[Profile.vue] Erro ao buscar perfil:', err)
      router.push('/login')
    }
  }
})

function logout() {
  auth.logout()
  router.push('/login')
}
</script>
