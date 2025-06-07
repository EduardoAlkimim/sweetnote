README.md para seu projeto
markdown
Copiar
Editar
# Nome do Projeto

Descrição breve do projeto.  
Projeto fullstack desenvolvido com Vue.js no frontend, Node.js no backend, estilizado com Tailwind CSS e usando banco de dados SQL.

---

## Tecnologias usadas

- Vue.js  
- Node.js  
- Tailwind CSS  
- SQL (PostgreSQL, MySQL, ou outro, especifique aqui)

---

## Pré-requisitos

- Node.js instalado ([baixar aqui](https://nodejs.org/))  
- Banco de dados SQL configurado (PostgreSQL, MySQL, etc)  
- Yarn ou npm (gerenciador de pacotes)

---

## Como rodar o projeto

### Backend

1. Navegue até a pasta do backend:

   ```bash
   cd backend
Instale as dependências:

bash
Copiar
Editar
npm install
Configure seu banco de dados no arquivo .env (crie a partir do .env.example se houver):

env
Copiar
Editar
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
PORT=3000
Rode as migrations (se usar) ou configure o banco conforme o projeto.

Inicie o servidor backend:

bash
Copiar
Editar
npm run dev
Frontend
Navegue até a pasta do frontend:

bash
Copiar
Editar
cd frontend
Instale as dependências:

bash
Copiar
Editar
npm install
Configure a URL da API no .env:

env
Copiar
Editar
VITE_API_URL=http://localhost:3000
Inicie a aplicação frontend:

bash
Copiar
Editar
npm run dev
