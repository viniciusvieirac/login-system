📋 README - Sistema de Autenticação

🚀 Como Executar

Pré-requisitos:

Node.js instalado

MySQL instalado e rodando

Backend

```bash
cd backend
npm install
```

Configure o .env com suas credenciais MySQL

cp .env.example .env

npm run dev

Servidor rodará em http://localhost:8888

Frontend

```bash
cd frontend
cd vue-project
npm install
npm run dev
```
Aplicação rodará em http://localhost:5173

⚙️ Configuração

Banco de Dados

Crie o banco no MySQL:

sql

CREATE DATABASE user_login;

Configure o arquivo .env:

env
DB_HOST=localhost
DB_NAME=user_login  
DB_USER=root
DB_PASSWORD=sua_senha
JWT_SECRET=seu_jwt_secret


📋 Funcionalidades:

✅ Cadastro de usuários

✅ Login com JWT

✅ Perfil protegido

✅ Autenticação com tokens

🛠️ Tecnologias:

Backend: Node.js, Express, Sequelize, MySQL, JWT

Frontend: Vue 3, Vue Router, Vuex

🔌 Endpoints:

POST /api/register - Criar usuário

POST /api/login - Fazer login

GET /api/profile - Ver perfil (requer token)
