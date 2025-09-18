<template>
  <div class="profile-container">
    <div class="profile">
      <h2>Perfil</h2>
      <div v-if="auth.user">
        <p><strong>Nome:</strong> {{ auth.user.name }}</p>
        <p><strong>Email:</strong> {{ auth.user.email }}</p>
        <button @click="logout">Sair</button>
      </div>
      <div v-else>Carregando...</div>
    </div>
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
        if (confirm('Sua sessão expirou. Deseja fazer login novamente?')) {
        router.push('/login')
      } else {
        router.push('/')
      }
    }
  }
})

function logout() {
  auth.logout()
  router.push('/login')
}
</script>


<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 1rem;
}

.profile {
  max-width: 400px;
  width: 100%;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.profile h2 {
  text-align: center;
  margin-bottom: 1.8rem;
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.8rem;
}

.profile div {
  text-align: center;
}

.profile p {
  margin-bottom: 1.2rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  color: #2c3e50;
}

.profile p strong {
  color: #2c3e50;
}

.profile button {
  padding: 0.9rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #e74c3c;
  color: white;
  margin-top: 1rem;
}

.profile button:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
}
</style>
