# 🐾 Get A Pet - Sistema de Adoção de Animais

O **Get A Pet** é uma aplicação **Full Stack** robusta desenvolvida para facilitar o processo de adoção de animais de estimação. A plataforma permite que protetores cadastrem animais disponíveis e que adotantes entrem em contato de forma segura e organizada através de um sistema de agendamento de visitas.

Este projeto demonstra competências avançadas em desenvolvimento Web, incluindo **autenticação segura**, **manipulação de arquivos no servidor** e **gerenciamento de estados complexos no frontend**.

---

## 🚀 Tecnologias e Ferramentas

### 🎨 Frontend
- **React.js** — Biblioteca principal para construção de interfaces SPA dinâmicas  
- **Context API** — Gerenciamento de estado global (autenticação e mensagens do sistema)  
- **React Router DOM** — Navegação entre páginas (client-side routing)  
- **Axios** — Cliente HTTP para consumo da API REST  
- **CSS Modules** — Estilização encapsulada para evitar conflitos de estilo  

### ⚙️ Backend
- **Node.js & Express** — Servidor e framework para gerenciamento de rotas e middlewares  
- **MongoDB & Mongoose** — Banco de dados NoSQL e modelagem de documentos  
- **JWT (JSON Web Token)** — Autenticação baseada em tokens para rotas protegidas  
- **Bcrypt** — Criptografia de senhas para segurança do banco de dados  
- **Multer** — Processamento e armazenamento de uploads de imagens físicas  

---

## 🛠️ Funcionalidades Principais

### 🔐 Autenticação e Perfil
- **Registro e Login** com validação de campos e segurança de sessão  
- **Gestão de Perfil** com edição de nome, telefone, e-mail e foto de perfil  

### 🐶 Gerenciamento de Pets
- **CRUD Completo** — Cadastro (com múltiplas fotos), edição, listagem e exclusão  
- **Galeria Dinâmica** — Troca de imagem principal ao clicar nas miniaturas  
- **Controle de Propriedade** — Identificação automática do dono do pet para liberar ações administrativas  

### ❤️ Processo de Adoção
- **Agendamento de Visita** — Solicitação direta de interesse em um pet  
- **Dashboard de Adoções**
  - **Aba "Quero Adotar"** — Pets em que o usuário demonstrou interesse, com contato do dono  
  - **Aba "Solicitações"** — Lista de interessados nos pets do usuário  
- **Cancelamento e Recusa** — Interrupção do processo por ambas as partes  
- **Finalização da Adoção** — Marca o pet como adotado, removendo-o da vitrine pública  

---

## 🛣️ Estrutura de Endpoints (API)

### 👤 Usuários (`/users`)
- `POST /register` — Cadastro de novos usuários  
- `POST /login` — Autenticação e geração de token  
- `GET /checkuser` — Validação de sessão ativa  
- `PATCH /edit/:id` — Atualização de perfil com upload de imagem  

### 🐾 Pets (`/pets`)
- `GET /getAllPets` — Listagem pública de pets disponíveis  
- `POST /create` — Cadastro de novo pet (requer token)  
- `GET /getPetsByOwner` — Pets cadastrados pelo usuário  
- `GET /myAddoptions` — Pets em que o usuário é candidato à adoção  
- `GET /:id` — Detalhes completos de um pet  
- `PATCH /update/:id` — Edição de dados ou cancelamento de vínculo  
- `PATCH /schedule/:id` — Registro de interesse em um pet  
- `PATCH /conclude/:id` — Conclusão definitiva da adoção  
- `DELETE /remove/:id` — Exclusão de um pet  

---

## 📁 Estrutura do Projeto

```text
├── backend/
│   ├── controllers/    # Lógica de negócio (Pets / Users)
│   ├── helpers/        # Middlewares (auth, upload de imagens)
│   ├── models/         # Schemas do Mongoose
│   └── routes/         # Rotas do Express
└── frontend/
    └── src/
        ├── components/ # Componentes reutilizáveis
        ├── context/    # UserContext e persistência de login
        ├── hooks/      # Hooks customizados
        ├── pages/      # Páginas principais da aplicação
        └── utils/      # Configuração do Axios e API
```

## 💻 Como Executar o Projeto

Pré-requisitos
Node.js e NPM instalados.

MongoDB rodando localmente ou via Atlas.

Passos
Clone o repositório: git clone https://github.com/seu-usuario/get-a-pet.git

### No diretório backend:

Execute npm install.

Crie um arquivo .env com as chaves: PORT=5000, MONGO_URI e JWT_SECRET.

Inicie com npm start.

### No diretório frontend:

Execute npm install.

Inicie com npm start.

Acesse http://localhost:3000.

Desenvolvido por Victor Hugo Nunes Alves
