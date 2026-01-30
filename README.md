🐾 Get A Pet - Sistema de Adoção de Animais
O Get A Pet é uma aplicação BackEnd desenvolvida para conectar pessoas interessadas em adotar animais de estimação a protetores ou donos que precisam encontrar um novo lar para seus pets. O sistema conta com gerenciamento completo de usuários, perfis, cadastro de animais e um fluxo de solicitações de adoção.
Apesar de ter um FrontEnd complexo e bem estruturado ele foi criado por IA somente com o intuito de consumir o BackEnd criado por mim, meu foco atualmente é me desenvolver completamente como dev backend, e posteriormente pretendo aprender tecnologias de frontend como React.

🚀 Tecnologias Utilizadas
Frontend
React.js: Biblioteca principal para construção da interface.

React Router Dom: Gerenciamento de rotas e navegação SPA.

Axios: Integração com a API REST.

CSS Modules: Estilização escopada para evitar conflitos.

Context API: Gerenciamento global do estado de autenticação.

Backend
Node.js & Express: Ambiente de execução e framework para a API.

MongoDB & Mongoose: Banco de dados NoSQL e modelagem de dados.

JWT (JSON Web Token): Autenticação segura de usuários.

Bcrypt: Criptografia de senhas.

Multer: Middleware para processamento de upload de imagens.

🛠️ Funcionalidades Principais
Sistema de Usuários: Registro, Login, Logout e Edição de Perfil com foto.

Gestão de Pets: Cadastro (com múltiplas fotos), Edição, Listagem e Exclusão (CRUD completo).

Fluxo de Adoção:

Usuários podem visualizar pets de terceiros e solicitar uma visita.

O dono do pet recebe a solicitação com os dados de contato do interessado.

O dono pode Concluir a adoção (finalizando o ciclo) ou Recusar (liberando o pet novamente).

O adotante pode desistir da solicitação a qualquer momento.

Dashboard: Painel separado para gerenciar pets próprios e pets em processo de adoção.

🛣️ Estrutura de Rotas (API)
Usuários (/users)
POST /register: Cria um novo usuário.

POST /login: Autentica o usuário e retorna o token JWT.

GET /checkuser: Valida o usuário através do token.

PATCH /edit/:id: Atualiza dados do perfil (Nome, E-mail, Telefone, Senha e Imagem).

Pets (/pets)
POST /create: Cadastra um novo pet (Requer Token).

GET /getAllPets: Rota pública para listar todos os pets disponíveis.

GET /getPetsByOwner: Lista apenas os pets do usuário logado.

GET /myAddoptions: Lista os pets que o usuário solicitou adoção.

GET /:id: Retorna detalhes de um pet específico.

DELETE /remove/:id: Remove um pet do sistema.

PATCH /update/:id: Atualiza informações ou limpa o adotante (Recusar/Desistir).

PATCH /schedule/:id: Registra o interesse de um usuário em um pet.

PATCH /conclude/:id: Finaliza o processo de adoção (Indisponibiliza o pet).

📁 Estrutura do Projeto
Bash
├── backend/
│   ├── controllers/    # Lógica de negócio (Pets e Users)
│   ├── helpers/        # Middleware (Token, Imagens)
│   ├── models/         # Schemas do MongoDB (Mongoose)
│   └── routes/         # Definição dos endpoints
└── frontend/
    ├── src/
    │   ├── components/ # Componentes reutilizáveis (Layout, Form, etc)
    │   ├── context/    # UserContext e AuthLogic
    │   ├── hooks/      # Hooks customizados (FlashMessages)
    │   ├── pages/      # Telas principais da aplicação
    │   └── utils/      # Configurações do Axios (API)
🔧 Como executar o projeto
Clone o repositório: git clone https://github.com/seu-usuario/get-a-pet.git

Configuração do Backend:

Entre na pasta backend.

Instale as dependências: npm install.

Crie um arquivo .env com sua string de conexão do MongoDB e uma chave secreta JWT.

Inicie o servidor: npm start.

Configuração do Frontend:

Entre na pasta frontend.

Instale as dependências: npm install.

Inicie a aplicação: npm start.

Acesse http://localhost:3000 no seu navegador.
