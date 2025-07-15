🚀 API de Gerenciamento de Usuários e Alunos

API REST feita com Node.js, Express e PostgreSQL para gerenciar usuários e alunos, com operações CRUD, autenticação básica e upload de fotos referenciadas aos alunos.

Ideal pra quem quer uma base limpa e funcional para APIs completas.

🛠️ Funcionalidades
✅ Cadastro, listagem, atualização e exclusão de usuários (nome, email, senha)

✅ CRUD completo de alunos

✅ Upload e referência de fotos para alunos

✅ Autenticação de usuários (login, geração de token, sem JWT avançado)

✅ Validações de dados de entrada

✅ Organização limpa de controllers, rotas e middlewares

🧰 Tecnologias
Node.js – Runtime backend

Express – Framework de rotas e servidor

PostgreSQL – Banco relacional

Sequelize – ORM para facilitar a interação com o banco

Multer – Upload de arquivos (fotos)

bcryptjs – Criptografia de senhas

jsonwebtoken – Geração e validação de tokens

Dotenv – Gerenciamento de variáveis de ambiente

⚙️ Como rodar o projeto
1️⃣ Clone o repositório:

bash
Copiar
Editar
git clone https://github.com/cardosoGu/API.git
cd API
2️⃣ Instale as dependências:

bash
Copiar
Editar
npm install
3️⃣ Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto com:

ini
Copiar
Editar
DATABASE=nome_do_banco
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=usuario
DATABASE_PASSWORD=senha

TOKEN_SECRET=sua_chave_secreta
TOKEN_EXPIRATION=7d

PORT=3000
URL=http://localhost:3000
4️⃣ Configure o PostgreSQL:

Certifique-se que o PostgreSQL está rodando localmente ou use serviços como Railway ou Neon.

Crie o banco:

bash
Copiar
Editar
createdb nome_do_banco
Rode as migrations (caso tenha):

bash
Copiar
Editar
npx sequelize db:migrate
5️⃣ Rode o projeto:

bash
Copiar
Editar
npm start
A API estará disponível em http://localhost:3000.

📡 Endpoints
Usuários
POST /users – Cadastrar usuário

GET /users – Listar usuários

PUT /users/:id – Atualizar usuário

DELETE /users/:id – Deletar usuário

POST /login – Autenticação de usuário (retorna token)

Alunos
POST /alunos – Cadastrar aluno

GET /alunos – Listar alunos

GET /alunos/:id – Detalhar aluno

PUT /alunos/:id – Atualizar aluno

DELETE /alunos/:id – Deletar aluno

Fotos
POST /fotos – Upload de fotos referenciadas a alunos

📁 Estrutura do projeto
bash
Copiar
Editar
├── src
│   ├── config            # Configurações (db, multer, etc.)
│   ├── controllers       # Lógicas de cada rota
│   ├── database
│   │   ├── migrations    # Migrations do banco
│   │   └── models        # Modelos Sequelize
│   ├── middlewares       # Middlewares de autenticação, erros
│   ├── routes            # Rotas da API
│   └── server.js         # Ponto de entrada da API
🖐️ Exemplo de uso
Criar um usuário via curl:

bash
Copiar
Editar
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"name":"João","email":"joao@email.com","password":"123456"}'
🤝 Contribuições
Quer melhorar ou estudar junto?
Abre um PR ou issue aqui no GitHub. 😎

📄 Licença
Projeto licenciado sob MIT.
