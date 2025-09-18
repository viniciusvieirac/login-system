<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="submit">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required minlength="6" />
      <button :disabled="loading">{{ loading ? 'Entrando...' : 'Entrar' }}</button>
      <button type="button" @click="goRegister">Registre-se</button>
      <p v-if="error" class="error" color="red">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
  import { ref }  from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';

  const router = useRouter();
  const authStore = useAuthStore();

  const email = ref('');
  const password = ref('');
  const loading = ref(false);
  const error = ref(null);

  async function submit() {
    loading.value = true;
    error.value = null;

    try {
      await authStore.login(email.value, password.value);
      router.push('/profile');
    } catch (err) {
      error.value = err.response?.data?.message || 'Erro ao fazer login.';
    } finally {
      loading.value = false;
    }
  }

  function goRegister() {
  router.push('/register')
}
</script>

<style scoped>


</style>