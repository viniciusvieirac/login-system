<template>
  <div>
    <h2>Cadastro</h2>
    <form>
      <div>
        <label for="name">Nome:</label>
        <input
          type="text"
          id="name"
          required
          placeholder="Seu nome completo"
        />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          required
          placeholder="Seu email"
        />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input
          type="password"
          id="password"
          required
          placeholder="Sua senha"
          minlength="6"
        />
      </div>
      <button type="submit">
      </button>
      <p>
        Já tem uma conta? <router-link to="/login">Faça login</router-link>
      </p>
    </form>
  </div>
</template>