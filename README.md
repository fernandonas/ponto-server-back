# Ponto Server

API Express com PostgreSQL, CRUD de usuarios e login com JWT.

Roles disponiveis:

- `admin`: acesso total as rotas de usuarios.
- `basic`: acesso basico as rotas autenticadas comuns.

## Requisitos

- Node.js
- PostgreSQL

## Configuracao

### Usando banco no Docker/WSL e API no Windows

Se apenas o PostgreSQL roda no WSL, suba o banco pelo terminal Linux:

```bash
cd /mnt/c/Projetos/ponto-server
docker compose up -d
```

Depois, no terminal do Windows, rode a API normalmente:

```powershell
cd C:\Projetos\ponto-server
npm install
Copy-Item .env.example .env
npm run migrate
npm run dev
```

No Windows, a API ficara em:

```text
http://localhost:3000
```

O `DATABASE_URL` padrao ja aponta para o Postgres publicado pelo Docker:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/ponto_server
```

Se o WSL nao encaminhar a porta `5432` para o Windows, use o IP do WSL no lugar de `localhost`.

Se o comando `npm` no WSL apontar para `/mnt/c/Users/.../npm` e mostrar `node: not found`, nao use `npm` no WSL para subir o banco. Use `docker compose up -d` diretamente.

### Usando Docker no Windows ou PostgreSQL local

1. Suba um PostgreSQL local com Docker:

```bash
npm run db:up
```

Ou crie o banco manualmente:

```sql
CREATE DATABASE ponto_server;
```

2. Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

3. Ajuste `DATABASE_URL` e `JWT_SECRET` no `.env`.

4. Instale dependencias:

```bash
npm install
```

5. Rode a migration:

```bash
npm run migrate
```

6. Inicie a API:

```bash
npm run dev
```

## Rotas

### Health check

```http
GET /health
```

### Criar usuario

```http
POST /api/users
Content-Type: application/json

{
  "name": "Fernando",
  "email": "fernando@email.com",
  "password": "123456"
}
```

O primeiro usuario cadastrado recebe a role `admin`. Os proximos recebem `basic`.

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "fernando@email.com",
  "password": "123456"
}
```

### Rotas protegidas

Use o token retornado no login:

```http
Authorization: Bearer seu-token
```

```http
GET /api/users
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id
GET /api/auth/me
GET /api/dice
```

As rotas `/api/users` de leitura, edicao e remocao exigem role `admin`.
