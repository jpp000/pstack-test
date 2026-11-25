# #00 — Scaffold do monorepo

**Objetivo:** um comando sobe backend e frontend; o frontend consegue chamar a API.

**Specs:** [00-api-conventions](../specs/00-api-conventions.md)

## Tarefas

- [ ] Workspace pnpm na raiz com dois pacotes: `backend/` (NestJS + TypeORM + SQLite) e `frontend/` (Vite + React + TypeScript).
- [ ] TypeScript `strict` nos dois pacotes.
- [ ] Scripts na raiz: `pnpm dev` (sobe os dois), `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm seed`.
- [ ] Backend: prefixo global `/api`, `ValidationPipe` com whitelist e rejeição de campos desconhecidos, filtro de exceção que produz o formato de erro da spec 00, CORS para o dev server do frontend.
- [ ] `GET /api/health` → `{ "status": "ok" }`.
- [ ] Config por variável de ambiente (`PORT`, `DATABASE_PATH`, `JWT_SECRET`) com `.env.example`; `.env` e `backend/data/` no `.gitignore`.
- [ ] Banco criado por migrations do TypeORM (sem `synchronize` fora dos testes).
- [ ] Frontend: proxy do Vite de `/api` para o backend; página inicial mostra o resultado de `/api/health`.
- [ ] Setup de testes: Jest + supertest no backend (com SQLite em memória), Vitest + Testing Library no frontend, cada um com um teste de exemplo verde.
- [ ] `README.md` na raiz: pré-requisitos e como rodar.

## Aceite

- `pnpm install && pnpm dev` sobe tudo; abrir o frontend mostra "API ok".
- `pnpm test`, `pnpm lint` e `pnpm typecheck` passam.
- Uma rota inexistente responde no formato de erro da spec 00.
