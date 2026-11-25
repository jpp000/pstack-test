# Shop

E-commerce local: backend NestJS + TypeORM (SQLite) e frontend Vite + React, em TypeScript `strict`, num monorepo pnpm.

| Pacote | Porta | Detalhes |
|---|---|---|
| `backend/` | `3000` (API em `/api`) | [backend/README.md](backend/README.md) |
| `frontend/` | `5173` | [frontend/README.md](frontend/README.md) |

## Pré-requisitos

- Node.js 22 ou mais novo.
- pnpm na versão fixada em `package.json` (`packageManager`). O jeito mais simples é pelo Corepack, que vem com o Node:

  ```sh
  corepack enable
  ```

O `better-sqlite3` compila (ou baixa) um binário nativo na instalação; isso já está liberado em `allowBuilds` no `pnpm-workspace.yaml`, então o `pnpm install` não pede confirmação.

## Rodar

```sh
pnpm install
pnpm dev
```

`pnpm dev` sobe backend e frontend juntos. Na primeira vez, cria `backend/.env` a partir de `backend/.env.example`, e o banco `backend/data/dev.sqlite` é criado aplicando as migrations. Abra `http://localhost:5173`: a página mostra **API ok** quando o frontend alcança o backend (o Vite repassa `/api` para a porta 3000).

## Comandos na raiz

| Comando | O que faz |
|---|---|
| `pnpm dev` | Backend em watch + Vite. |
| `pnpm test` | Jest + supertest no backend (SQLite em memória) e Vitest + Testing Library no frontend. |
| `pnpm lint` | ESLint com typescript-eslint nos dois pacotes (config única em `eslint.config.js`). |
| `pnpm typecheck` | `tsc` sem emitir nos dois pacotes. |
| `pnpm seed` | Aplica as migrations e roda o seed do backend. Pode rodar quantas vezes quiser. |

Uma issue está pronta quando `pnpm test`, `pnpm lint` e `pnpm typecheck` passam na raiz.

## Documentação

- [`docs/roadmap.md`](docs/roadmap.md): visão, escopo e ordem das issues.
- [`docs/domain.md`](docs/domain.md): glossário e invariantes do domínio.
- [`docs/specs/`](docs/specs/): regras e contratos da API.
- [`docs/issues/`](docs/issues/): unidades de trabalho.
