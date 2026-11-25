# frontend

Vite + React 19 + TypeScript `strict`. Dados do servidor via TanStack Query.

## Layout

```
src/
  main.tsx               monta o React e o QueryClientProvider
  App.tsx                raiz da UI; renderiza containers
  api/                   acesso HTTP: client.ts (apiGet, ApiError) e, depois,
                         um arquivo por domínio da API
  features/<feature>/    tudo de uma tela ou domínio: hooks de dados,
                         containers, componentes de apresentação e testes
  test/setup.ts          setup do Vitest (matchers do jest-dom, cleanup)
```

**Por quê:** pastas por feature espelham os domínios das specs (`catalog`, `cart`, `orders`, `account`, `admin`), então uma issue de UI mexe numa pasta só. O acesso HTTP fica isolado em `api/` para que nenhum componente chame `fetch` direto e todo erro chegue como `ApiError` com o código da spec 00. TanStack Query entrou já na #00 porque a spec 05 pede que o contador do carrinho atualize após qualquer mudança, o que se resolve invalidando o cache da query.

## Container / presentation

Convenção de nomes (ver `CLAUDE.md`), sempre na mesma pasta da feature:

- `XContainer.tsx`: container. Chama hooks de dados (`useX`), lê rota/sessão, trata loading e erro e repassa tudo por props. Quase sem markup próprio.
- `X.tsx`: apresentação. Função pura de props para UI; recebe dados e callbacks (`onSubmit`, `onRemove`). Testada renderizando com props, sem mock de rede.
- `useX.ts`: hook de dados (TanStack Query), chamado só por containers.

Exemplo: `features/health/` tem `useHealth.ts`, `HealthStatusContainer.tsx` e `HealthStatus.tsx`, com props como união discriminada (`loading` | `ok` | `error`).

## Scripts

| Script | O que faz |
|---|---|
| `pnpm dev` | Vite em `http://localhost:5173`. O proxy manda `/api` para `http://localhost:3000` (porta fixa em `vite.config.ts`; se mudar `PORT` no backend, mude aqui também). |
| `pnpm test` | Vitest + Testing Library em jsdom. |
| `pnpm lint` / `pnpm typecheck` | ESLint (config na raiz, com regras de hooks) e `tsc -b` sobre `src` e `vite.config.ts`. |
| `pnpm build` | Typecheck e build de produção em `dist/`. |
