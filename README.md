# 🚀 Chama Aí

Sistema web para conectar clientes e prestadores de serviços de forma simples, rápida e organizada.

O objetivo do projeto é permitir que clientes encontrem profissionais de diversas áreas, enquanto prestadores de serviços podem criar e gerenciar seus perfis, informando disponibilidade, localização e categoria de atuação.

Além de ser um potencial Micro-SaaS, o projeto também está sendo desenvolvido como parte do meu portfólio para demonstrar conhecimentos em desenvolvimento Full Stack.

---

## 📖 Sobre o Projeto

O Chama Aí é uma plataforma onde:

### 👤 Clientes
- Criam uma conta
- Buscam profissionais por categoria
- Filtram profissionais por cidade
- Visualizam perfis públicos

### 🛠 Prestadores de Serviço
- Criam uma conta
- Cadastram seu perfil profissional
- Escolhem uma categoria de atuação
- Informam localização e contato
- Ativam ou desativam seu perfil

---

## 🏗 Arquitetura

O projeto segue uma arquitetura Full Stack moderna.

### Backend

- Python
- FastAPI
- SQLAlchemy
- MySQL
- JWT Authentication
- Passlib (Hash de Senhas)

### Frontend (Em Desenvolvimento)

- React
- TypeScript
- Axios
- React Router

---

## 📂 Estrutura do Projeto

```text
backend/
│
├── app/
│   ├── database/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   └── dependencies/
│
├── .env
├── requirements.txt
└── main.py
```

---

## 🗄 Modelo de Dados

### Users

| Campo | Tipo |
|---------|---------|
| id | Integer |
| name | String |
| email | String |
| telefone | String |
| password | String |
| role | String |

---

### Categories

| Campo | Tipo |
|---------|---------|
| id | Integer |
| name | String |

---

### Providers

| Campo | Tipo |
|---------|---------|
| id | Integer |
| user_id | Integer |
| category_id | Integer |
| bio | String |
| cidade | String |
| estado | String |
| whatsapp | String |
| status | String |
| foto_perfil | String |

---

## 🔐 Segurança

Atualmente o sistema utiliza:

- Hash de senha com Passlib/Bcrypt
- JWT Authentication
- Variáveis de ambiente (.env)
- Senhas não armazenadas em texto puro

---

## ⚙️ Instalação

### 1 - Clonar o projeto

```bash
git clone https://github.com/seu-usuario/chama-ai.git
```

### 2 - Entrar na pasta

```bash
cd chama-ai/backend
```

### 3 - Criar ambiente virtual

```bash
python -m venv venv
```

### 4 - Ativar ambiente virtual

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

### 5 - Instalar dependências

```bash
pip install -r requirements.txt
```

---

## 🔧 Configuração

Criar um arquivo `.env`

```env
DATABASE_URL=mysql+pymysql://usuario:senha@localhost/chama_ai

SECRET_KEY=sua_chave_secreta

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=43200
```

---

## ▶️ Executando o Projeto

```bash
uvicorn main:app --reload
```

A API ficará disponível em:

```text
http://127.0.0.1:8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

---

## 📌 Funcionalidades Implementadas

### Autenticação

- [x] Cadastro de usuários
- [x] Login
- [x] Hash de senha
- [x] JWT

### Categorias

- [x] Criar categoria
- [x] Listar categorias

### Prestadores

- [x] Criar perfil
- [x] Buscar prestadores
- [x] Filtrar por categoria
- [x] Filtrar por cidade
- [x] Filtrar por status
- [x] Paginação
- [x] Buscar prestador por ID

---

## 🚧 Próximas Funcionalidades

- [ ] Atualizar perfil do prestador
- [ ] Alterar status do prestador
- [ ] Upload de foto de perfil
- [ ] Sistema de avaliações
- [ ] Favoritos
- [ ] Dashboard do prestador
- [ ] Frontend React
- [ ] Deploy em produção

---

## 🎯 Objetivo do Projeto

Este projeto está sendo desenvolvido para:

- Aprimorar conhecimentos em FastAPI
- Aprender arquitetura Full Stack
- Construir um projeto real de portfólio
- Explorar conceitos de Micro-SaaS
- Aplicar boas práticas de desenvolvimento

---

## 👨‍💻 Autor

**Welterson Gabriel**

Desenvolvedor Full Stack em formação.

- LinkedIn: (www.linkedin.com/in/welterson-gabriel-131473313/)
- GitHub: (github.com/weltersongabriel)

---

⭐ Se este projeto te ajudou ou achou interessante, considere deixar uma estrela no repositório.