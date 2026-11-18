# 🚀 Chama Aí

<p align="center">
  <img src="./docs/screenshots/home.png" alt="Chama Aí Logo" width="900"/>
</p>

<p align="center">
  <strong>Encontre profissionais. Chame quem você precisa.</strong>
</p>

<p align="center">
  Um Micro-SaaS desenvolvido para conectar pessoas que precisam de serviços a profissionais disponíveis em sua região.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-MVP%20concluído-2563EB?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/backend-FastAPI-009688?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/frontend-React-61DAFB?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/database-MySQL-4479A1?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/tests-111%20passing-brightgreen?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/coverage-98.7%25-success?style=for-the-badge"/>
</p>

<p align="center">
  🌐 <strong>Acesse o projeto (Frontend):</strong> <a href="https://chama-ai-wg.vercel.app/" target="_blank">Clique aqui para ver a aplicação</a><br/>
  <sub><em>Nota: O link acima contém a demonstração da interface (frontend) da aplicação.</em></sub>
</p>

---

## 📸 Sobre o projeto

**Chama Aí** é um Micro-SaaS desenvolvido com o objetivo de facilitar a busca por profissionais para diferentes tipos de serviços.

A ideia é simples:

> **Precisou de um profissional? Chama Aí.**

O usuário pode pesquisar profissionais por categoria e localização, visualizar seus dados e entrar em contato diretamente através do WhatsApp.

O projeto foi desenvolvido como uma aplicação **Full Stack**, utilizando **Python + FastAPI** no backend, **TypeScript + React** no frontend e **MySQL** como banco de dados.

---

## 🎯 Problema

Encontrar profissionais confiáveis para realizar pequenos serviços pode ser uma tarefa difícil.

Muitas vezes, as pessoas dependem de:

* Indicações de amigos;
* Grupos de WhatsApp;
* Redes sociais;
* Pesquisas espalhadas pela internet;
* Contatos antigos.

O **Chama Aí** busca centralizar essa experiência em uma única plataforma.

---

## 💡 Solução

A plataforma permite que usuários encontrem profissionais de diferentes categorias e regiões.

### 👤 Para quem precisa de um serviço

O usuário pode:

* 🔎 Pesquisar profissionais;
* 📂 Filtrar por categoria;
* 📍 Pesquisar por localização;
* 👨‍🔧 Visualizar profissionais disponíveis;
* 📱 Entrar em contato pelo WhatsApp.

### 🧑‍🔧 Para profissionais

O profissional pode:

* 📝 Criar seu cadastro;
* 🏷️ Selecionar sua categoria;
* 📍 Informar sua localização;
* 📄 Adicionar uma descrição sobre seus serviços;
* 🟢 Definir seu status de disponibilidade;
* 📱 Disponibilizar seu WhatsApp para contato.

---

# ✨ Funcionalidades

## 🔐 Autenticação

* Cadastro de usuários;
* Login;
* Autenticação utilizando JWT;
* Senhas armazenadas com hash (bcrypt);
* Proteção de rotas privadas.

## 🔎 Busca de profissionais

* Pesquisa de profissionais;
* Filtro por categoria;
* Filtro por cidade;
* Filtro por estado;
* Filtro por status (ativo/inativo);
* Paginação;
* Exibição de profissionais ativos com média de avaliações.

## 🧑‍🔧 Gerenciamento de profissionais

* Cadastro de perfil profissional;
* Atualização de informações;
* Atualização do status (ativo/inativo);
* Associação com categorias;
* Informações de contato.
* Visualização do próprio perfil (`/providers/me`)

## ⭐ Sistema de avaliações

* Criar avaliações para profissionais (1 a 5 estrelas + comentário);
* Listar próprias avaliações;
* Visualizar avaliações de um prestador específico;
* Impede avaliações duplicadas do mesmo usuário para o mesmo profissional.

## ❤️ Favoritos

* Adicionar/remover profissionais aos favoritos;
* Listar favoritos do usuário;
* Isolamento por usuário (cada usuário vê apenas seus favoritos).

## 🎫 Sistema de tickets (suporte)

* Criar tickets de suporte;
* Listar próprios tickets;
* Atualizar status do ticket (aberto, em andamento, fechado);
* Isolamento por usuário.

## 📱 Contato

Após encontrar um profissional, o usuário pode utilizar o número cadastrado para entrar em contato diretamente pelo **WhatsApp**.

---

# 🛠️ Tecnologias utilizadas

## 🔙 Backend

| Tecnologia              | Utilização                        |
| ----------------------- | --------------------------------- |
| 🐍 **Python 3.11+**     | Linguagem principal               |
| ⚡ **FastAPI**           | Construção da API REST            |
| 🗃️ **SQLAlchemy 2.0**   | ORM moderno para comunicação com o banco  |
| 🔐 **JWT (python-jose)**| Autenticação e autorização        |
| 🔒 **Passlib / bcrypt** | Hash seguro de senhas             |
| 📦 **Pydantic v2**      | Validação e serialização de dados |
| 📄 **Uvicorn**          | Servidor ASGI                     |
| 🐬 **PyMySQL**          | Driver MySQL                      |

### Stack do Backend

<p>
  <img src="https://skillicons.dev/icons?i=python,fastapi" height="50"/>
</p>

---

## 🧪 Testes (Backend)

| Ferramenta            | Utilização                        |
| --------------------- | --------------------------------- |
| 🧪 **pytest**         | Framework de testes               |
| 📊 **pytest-cov**     | Cobertura de código               |
| 🎭 **pytest-mock**    | Mocking para testes               |
| 🌐 **httpx**          | Cliente HTTP assíncrono para testes |
| ⚡ **pytest-asyncio** | Suporte a testes assíncronos      |

### Métricas de Qualidade

* ✅ **111 testes** passando
* 📈 **98.70% de cobertura** (target: 80%)
* 🏗️ Testes organizados por feature (auth, users, providers, categories, reviews, favorites, tickets, error handling)
* 🔄 Isolamento total entre testes via SQLite em memória + transações
* 🛡️ Testes de segurança (SQL injection, XSS, CORS, rate limiting, constraints DB)

---

# 🎨 Frontend

O frontend foi desenvolvido utilizando uma abordagem moderna baseada em componentes.

| Tecnologia           | Utilização                          |
| -------------------- | ----------------------------------- |
| ⚛️ **React 19**      | Construção da interface             |
| 🔷 **TypeScript**    | Tipagem estática                    |
| 🎨 **Tailwind CSS v4**| Estilização moderna                |
| 🧭 **React Router 7**| Gerenciamento das rotas             |
| 🔗 **Axios**         | Comunicação com a API               |
| ⚡ **Vite 8**         | Ambiente de desenvolvimento e build |
| 📝 **React Hook Form**| Gerenciamento de formulários       |
| ✅ **Zod**           | Validação de esquemas               |

### Stack do Frontend

<p>
  <img src="https://skillicons.dev/icons?i=react,typescript,tailwind,vite" height="50"/>
</p>

---

# 🗄️ Banco de dados

O projeto utiliza **MySQL** para armazenamento dos dados da aplicação (produção).

Durante o desenvolvimento local e testes, o banco foi executado através de **SQLite em memória** para isolamento e velocidade.

### Tecnologias

<p>
  <img src="https://skillicons.dev/icons?i=mysql" height="50"/>
</p>

### Principais dados armazenados

* 👤 Usuários;
* 🧑‍🔧 Profissionais;
* 🏷️ Categorias;
* ⭐ Avaliações (Reviews);
* ❤️ Favoritos;
* 🎫 Tickets de suporte;
* 🔗 Relacionamentos entre usuários, profissionais e categorias.

A aplicação utiliza o **SQLAlchemy 2.0** para realizar a comunicação entre o backend e o banco de dados.

---

# 🔐 Segurança

A segurança foi uma das partes importantes durante o desenvolvimento do projeto, com **duas auditorias completas** realizadas (Backend e Frontend) e correções aplicadas.

## 🛡️ Medidas Implementadas

### Backend
* 🔑 Autenticação baseada em JWT (HS256, expiração 30 min);
* 🔒 Senhas armazenadas utilizando **bcrypt** (hash forte);
* 🛡️ Proteção de endpoints privados via dependência `get_current_user`;
* ✅ Validação rigorosa de dados através do **Pydantic v2**;
* 🔗 Controle de autorização por ownership (usuário só edita/deleta seus recursos);
* 🌐 Configuração de CORS restrita ao frontend;
* 🔐 Variáveis sensíveis separadas através de `.env` (SECRET_KEY, DATABASE_URL);
* 🚫 Não armazenamento de senhas em texto puro;
* 🛡️ SQL Injection prevention via SQLAlchemy ORM (parameterized queries);
* 📝 Logs de erro sem vazamento de stack traces.

### Frontend (Atualizações Críticas Aplicadas)
* 🍪 **JWT armazenado exclusivamente em HttpOnly Cookies** (remoção total do localStorage);
* 🔒 **`withCredentials: true`** configurado no Axios para envio automático de cookies;
* 🛡️ **Content Security Policy (CSP)** rigoroso via `vercel.json`;
* 🛡️ **Headers de segurança adicionais**:
  * `X-Content-Type-Options: nosniff`
  * `X-Frame-Options: DENY`
  * `Referrer-Policy: strict-origin-when-cross-origin`
  * `Permissions-Policy: camera=(), microphone=(), geolocation=()`
* 🌐 Configuração de CORS no backend permite apenas origem do frontend (`VITE_API_URL`);
* 🚫 Remoção do interceptor que injetava `Authorization: Bearer` manualmente.

### Auditorias Realizadas
| Auditoria | Status | Findings |
|-----------|--------|----------|
| 🔍 **Backend Security Audit** | ✅ Concluída | 24 achados (4 Críticos, 5 Altos, 8 Médios, 7 Baixos) |
| 🔍 **Frontend Security Audit** | ✅ Concluída | 18 achados (3 Críticos, 4 Altos, 6 Médios, 5 Baixos) |
| 🛠️ **Correções Críticas Frontend** | ✅ Aplicadas | 4 arquivos corrigidos |

> **Nota:** Rate Limiting está planejado para versão futura. Atualmente documentado nos testes como comportamento conhecido.

---

# 📱 Responsividade

A interface foi desenvolvida pensando em diferentes tamanhos de tela.

O layout se adapta para:

* 🖥️ Desktop;
* 💻 Notebook;
* 📱 Smartphones;
* 📲 Tablets.

A experiência mobile recebeu atenção especial para manter a interface simples e objetiva.

---

# 📸 Screenshots

## 🏠 Página inicial

<p align="center">
  <img src="./docs/screenshots/home.png" alt="Página inicial do Chama Aí" width="900"/>
</p>

---

## 🔎 Busca de profissionais

<p align="center">
  <img src="./docs/screenshots/busca-profissionais.png" alt="Busca de profissionais" width="900"/>
</p>

---

## 🧑‍🔧 Perfil profissional

<p align="center">
  <img src="./docs/screenshots/perfil-profissional.png" alt="Perfil profissional" width="900"/>
</p>

---

## 📱 Versão mobile

<p align="center">
  <img src="./docs/screenshots/mobile.png" alt="Chama Aí no celular" width="350"/>
</p>

---

# ⚙️ Como executar o projeto

## 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de possuir:

* Python 3.10+
* Node.js 18+
* npm
* MySQL (para produção)
* Git

---

# 🗄️ 1. Configurando o banco (Produção)

Inicie o **MySQL** (via XAMPP, Docker, ou instalação nativa):

```text
MySQL
```

Crie o banco de dados utilizado pela aplicação.

Depois, configure as variáveis de ambiente do backend no arquivo:

```text
.env
```

Exemplo:

```env
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/chamaai
SECRET_KEY=sua-chave-secreta-super-segura
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:5173
```

> ⚠️ **Nunca envie o arquivo `.env` para o GitHub.**

---

# 🔙 2. Executando o Backend

Entre na pasta:

```bash
cd backend
```

Crie um ambiente virtual:

```bash
python -m venv venv
```

Ative o ambiente virtual.

### Windows

```bash
venv\Scripts\activate
```

### Linux/Mac

```bash
source venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Execute a API:

```bash
uvicorn app.main:app --reload
```

O backend estará disponível em:

```text
http://127.0.0.1:8000
```

A documentação automática da API pode ser acessada através do Swagger:

```text
http://127.0.0.1:8000/docs
```

---

## 🧪 Executando os Testes (Backend)

```bash
cd backend

# Instalar dependências de teste
pip install -r requirements-test.txt

# Executar todos os testes com cobertura
python -m pytest tests/ -v --cov=app --cov-report=term-missing

# Executar testes específicos
python -m pytest tests/test_auth.py -v
python -m pytest tests/test_providers.py -v
python -m pytest tests/test_reviews.py -v
# ... etc
```

**Target de cobertura:** 80%  
**Cobertura atual:** 98.70%

---

# 🎨 3. Executando o Frontend

Em outro terminal:

```bash
cd frontend
```

Configure as variáveis de ambiente:

```bash
cp .env.example .env
# Edite .env com a URL da sua API
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O Vite disponibilizará a aplicação em um endereço semelhante a:

```text
http://localhost:5173
```

---

## 🏗️ Build para Produção

### Backend
```bash
cd backend
pip install -r requirements.txt
# Configure DATABASE_URL e SECRET_KEY para produção
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm run build
# O resultado estará em ./dist pronto para deploy (Vercel, Netlify, etc.)
```

---

# 📁 Estrutura do Projeto

```
ChamaAí/
├── backend/
│   ├── app/
│   │   ├── auth/           # JWT, dependências de auth
│   │   ├── database/       # Configuração SQLAlchemy
│   │   ├── models/         # Models SQLAlchemy
│   │   ├── routes/         # Endpoints da API
│   │   ├── schemas/        # Schemas Pydantic
│   │   ├── security/       # Validações de segurança
│   │   └── utils/          # Utilitários (hash, etc.)
│   ├── tests/              # 🧪 Suite de testes (111 testes)
│   │   ├── conftest.py     # Fixtures + SQLite em memória
│   │   ├── test_auth.py    # 16 testes
│   │   ├── test_users.py   # 7 testes
│   │   ├── test_providers.py # 35 testes
│   │   ├── test_categories.py # 7 testes
│   │   ├── test_reviews.py # 13 testes
│   │   ├── test_favorites.py # 13 testes
│   │   ├── test_tickets.py # 13 testes
│   │   └── test_error_handling.py # 15 testes
│   ├── requirements.txt
│   ├── requirements-test.txt
│   ├── pytest.ini
│   └── vercel.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── contexts/       # React Context (AuthProvider)
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── routes/         # Configuração de rotas
│   │   ├── services/       # Axios + API calls
│   │   └── types/          # Types TypeScript
│   ├── vercel.json         # CSP + Security Headers
│   ├── .env.example
│   └── package.json
├── docs/
│   └── screenshots/
└── README.md
```

---

# 🧠 O que aprendemos desenvolvendo o Chama Aí

O desenvolvimento do projeto proporcionou experiência prática em diversas áreas do desenvolvimento de software.

### Backend

* Desenvolvimento de APIs REST com FastAPI;
* Autenticação e autorização JWT;
* Hash de senhas com bcrypt;
* SQLAlchemy 2.0 (ORM moderno);
* MySQL + PyMySQL;
* Validação de dados com Pydantic v2;
* Organização de rotas e arquitetura limpa;
* Variáveis de ambiente e configuração;
* CORS e segurança de APIs;
* **Testes automatizados com pytest (111 testes, 98.7% cobertura)**;
* SQLite em memória para testes isolados;
* Fixtures e factory patterns para testes;
* Auditoria de segurança completa.

### Frontend

* React 19 + TypeScript;
* Componentização e reutilização;
* React Router 7 (data loading, actions);
* Context API para estado global;
* Tailwind CSS v4 (estilização utility-first);
* Responsividade mobile-first;
* Consumo de APIs com Axios;
* Gerenciamento de formulários (React Hook Form + Zod);
* **Segurança: HttpOnly Cookies, CSP, Security Headers**;
* Integração segura com backend;
* Deploy na Vercel com configuração de rewrites.

### Engenharia de software

* Git e GitHub (commits semânticos, branches);
* Organização de projetos Full Stack;
* Separação clara entre frontend e backend;
* Modelagem de banco de dados relacional;
* Desenvolvimento de MVP iterativo;
* Debugging e troubleshooting;
* **Auditoria de segurança (backend + frontend)**;
* Testes automatizados e CI/CD ready;
* Deploy e preparação para produção.

---

# 🚀 Próximos passos

O Chama Aí foi desenvolvido inicialmente como um **MVP**, mantendo o foco na funcionalidade principal da plataforma.

Algumas funcionalidades que podem ser adicionadas futuramente:

* 🔔 Notificações (push/email);
* 💬 Chat entre usuários e profissionais;
* 🛡️ **Rate Limiting** (backend);
* ☁️ Melhorias na infraestrutura (Docker, Kubernetes);
* 📱 Aplicativo mobile (React Native);
* 💳 Sistema de pagamentos/assinaturas;
* 🖼️ Upload de imagens para perfis;
* 📊 Dashboard de métricas para profissionais;
* 🌍 Internacionalização (i18n).

---

# 🌎 Objetivo

O objetivo do Chama Aí é tornar a contratação de serviços **mais simples, rápida e acessível**.

Em vez de perguntar:

> "Você conhece alguém que faça esse serviço?"

A ideia é simplesmente:

> **"Chama Aí." 🚀**

---

# 👨🏻‍💻 Desenvolvedor

Desenvolvido por **Welterson Gabriel**.

Estudante de Ciência da Computação e desenvolvedor com foco em **Backend, Python, APIs e desenvolvimento Full Stack**.

<p align="center">

<a href="https://github.com/weltersongabriel">
  <img src="https://img.shields.io/badge/GitHub-Welterson%20Gabriel-181717?style=for-the-badge&logo=github"/>
</a>

<a href="https://www.linkedin.com/in/welterson-gabriel-131473313/">
  <img src="https://img.shields.io/badge/LinkedIn-Welterson%20Gabriel-0A66C2?style=for-the-badge&logo=linkedin"/>
</a>

</p>

---

# 🤖 Apoio no desenvolvimento com Inteligência Artificial

O desenvolvimento do Chama Aí também contou com o apoio da Inteligência Artificial, utilizada como uma ferramenta de aprendizado, desenvolvimento e resolução de problemas ao longo de todo o projeto.

Durante essa jornada, o **Claude Code (Anthropic) e o ChatGPT (OpenAI)** foram importantes parceiros técnicos, auxiliando em diversas etapas do desenvolvimento, desde a concepção de ideias e arquitetura até a implementação, debugging, **auditoria de segurança completa**, **suite de testes automatizados (111 testes)**, documentação e correções críticas de segurança.

---

<p align="center">

# 🚀 Chama Aí

**Encontre. Conecte. Chame.**

⭐ Se você gostou do projeto, considere deixar uma estrela no repositório!

</p>