# backend

API NestJS + TypeORM (better-sqlite3). Pacote ESM (`"type": "module"`), porque o NestJS 12 só é publicado como ESM. Por isso os imports relativos terminam em `.js`, mesmo nos arquivos `.ts`.

## Layout

```
src/
  main.ts              entrada: lê a config, sobe o Nest, chama configureApp
  app.module.ts        AppModule.forRoot(config): junta os módulos de feature e o banco
  config/              AppConfig e loadConfig; único lugar que lê process.env
  common/              preocupações HTTP transversais: formato de erro, ApiException,
                       filtro global, ValidationPipe, configureApp
  database/            opções do TypeORM, data-source da CLI, seed,
                       entities.ts e migrations/index.ts (listas explícitas)
  <feature>/           um módulo Nest por domínio (hoje só health/): controller,
                       service, DTOs, entidades e testes unitários do domínio
test/                  testes e2e (supertest) contra o pipeline real
```

**Por quê:** pastas por feature mantêm cada domínio das specs (`accounts`, `catalog`, `cart`, `orders`) num lugar só, então uma issue mexe em uma pasta e não em cinco camadas. O que é de todas as features e não é regra de domínio fica em `common/`, `config/` e `database/`. As issues seguintes criam `src/<feature>/` seguindo este padrão.

## Regras para as próximas issues

- **Config:** só `src/config/config.ts` lê `process.env`. Variável nova entra em `AppConfig`, em `loadConfig` e no `.env.example`.
- **Erros:** todo erro de domínio é lançado como `ApiException(status, código, mensagem, details?)`, com código `UPPER_SNAKE_CASE` e mensagem em português (spec 00). O filtro global (`common/api-exception.filter.ts`) converte o resto: falha de validação vira `400 VALIDATION_FAILED` com `details: [{ field, messages }]`, outro `HttpException` usa a tabela de status, erro desconhecido vira `500 INTERNAL_ERROR` sem vazar stack. Um `NotFoundException` comum é tratado como rota inexistente; recurso inexistente usa `ApiException` com `404`.
- **Entidades e migrations:** listadas à mão em `src/database/entities.ts` e `src/database/migrations/index.ts`, sem glob, para Nest, Jest e a CLI do TypeORM carregarem a mesma lista. `synchronize` é sempre `false`; o schema muda só por migration, aplicada ao subir o app (`migrationsRun`).
- **Testes e2e** montam `AppModule.forRoot({ ...config, databasePath: ':memory:' })` e chamam `configureApp`, para exercitar o mesmo pipeline do `main.ts`.

## Scripts

| Script | O que faz |
|---|---|
| `pnpm dev` | Cria `.env` a partir de `.env.example` se não existir e sobe em modo watch na porta `PORT` (3000). |
| `pnpm test` | Jest (unitários em `src/**/*.spec.ts` e e2e em `test/*.e2e-spec.ts`). Roda com `--experimental-vm-modules` porque o Nest é ESM; o aviso `ExperimentalWarning` é esperado. |
| `pnpm lint` / `pnpm typecheck` | ESLint (config na raiz) e `tsc --noEmit` sobre `src` e `test`. |
| `pnpm seed` | Compila, abre o banco (aplica migrations) e roda `seed()`. Idempotente. |
| `pnpm migration:generate src/database/migrations/<Nome>` | Gera uma migration comparando as entidades com o banco. Depois, adicione a classe gerada ao array em `migrations/index.ts`. |
| `pnpm migration:run` / `pnpm migration:revert` | Aplica as pendentes / desfaz a última. |

Os scripts de migration e seed compilam para `dist/` e rodam o JS, então usam o mesmo `tsc` (com metadata de decorators) do app.

## Configuração (`backend/.env`)

| Variável | Padrão | Obrigatória |
|---|---|---|
| `PORT` | `3000` | não |
| `DATABASE_PATH` | `data/dev.sqlite` (relativo a `backend/`) | não |
| `JWT_SECRET` | — | sim |
| `CORS_ORIGIN` | `http://localhost:5173` | não |
