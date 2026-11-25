# Spec 00 — Convenções da API

Vale para todos os endpoints. As specs de domínio só descrevem o que foge daqui.

## Base

- Prefixo: `/api`. Ex.: `GET /api/products`.
- JSON em `camelCase` nos dois sentidos.
- IDs: UUID v4 em string.
- Datas: ISO 8601 em UTC (`2026-11-25T13:00:00.000Z`).
- Dinheiro: inteiro em centavos, campos terminando em `Cents`.

## Autenticação

- `Authorization: Bearer <jwt>`.
- O JWT carrega `sub` (userId) e `role`. Expira em 7 dias. Sem refresh token.
- Rótulos usados nas specs:
  - **público**: sem token.
  - **cliente**: token com `role = CUSTOMER`.
  - **admin**: token com `role = ADMIN`.
- Sem token ou token inválido em rota protegida → `401`. Token válido com papel errado → `403`.

## Validação

- Todo body e query é validado na borda (DTO). Campos desconhecidos são rejeitados.
- Falha de validação → `400` com a lista de campos inválidos em `details`.

## Erros

Formato único:

```json
{
  "statusCode": 409,
  "error": "INSUFFICIENT_STOCK",
  "message": "Produto 'Caneca' tem só 2 unidades em estoque",
  "details": { "productId": "…", "available": 2 }
}
```

- `error` é um código estável em `UPPER_SNAKE_CASE`; o frontend decide a mensagem pelo código, não pelo texto.
- `message` é legível para humanos, em português.
- `details` é opcional.

| Status | Quando |
|---|---|
| 400 | Validação de entrada |
| 401 | Não autenticado |
| 403 | Papel sem permissão |
| 404 | Recurso não existe ou não pertence ao usuário |
| 409 | Regra de domínio violada (estoque, transição de status, e-mail duplicado, slug duplicado) |

Recurso de outro usuário responde `404`, nunca `403`, para não vazar existência.

## Paginação

Listagens paginadas aceitam `?page=1&pageSize=20` (`pageSize` máx. 100) e respondem:

```json
{ "items": [], "page": 1, "pageSize": 20, "total": 0 }
```

## Ambiente

- Banco: SQLite em arquivo local (`backend/data/dev.sqlite`), ignorado no git.
- Testes usam SQLite em memória, banco limpo por suíte.
- Seed idempotente: rodar duas vezes deixa o mesmo estado.
