<template>
  <div >
    <div >
      <div >
        <h1 >Sistema de Login</h1>
        <p >Bem-vindo de volta</p>
      </div>

      <div >
        <h2>Acessar Conta</h2>
        <div >
          <div >
            <label for="email" >Email:</label>
            <input
              type="email"
              id="email"
              placeholder="seu@email.com"
              disabled
            />
          </div>
          
          <div>
            <label for="password" >Senha:</label>
            <input
              type="password"
              id="password"
              
              placeholder="********"
              disabled
            />
          </div>
          
          <button  disabled>
            Entrar
          </button>
          
          <p >
            Não tem uma conta? 
            <a href="#">Cadastre-se aqui</a>
          </p>
        </div>
      </div>

      <div></div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>


</style>