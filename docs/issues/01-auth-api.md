# #01 — Autenticação e usuários (API)

**Objetivo:** cliente se cadastra e entra; admin existe via seed; rotas podem exigir papel.

**Specs:** [01-accounts](../specs/01-accounts.md), [domain](../domain.md)

## Tarefas

- [ ] Entidades `User` e `Customer` com migration.
- [ ] `POST /api/auth/register` cria `User` + `Customer` numa transação.
- [ ] `POST /api/auth/login` emite JWT com `sub` e `role`.
- [ ] `GET /api/auth/me`.
- [ ] Mecanismo reutilizável para exigir autenticação e papel (`CUSTOMER`, `ADMIN`) nas rotas, e para obter o usuário atual no handler.
- [ ] Seed idempotente do admin `admin@shop.local`.
- [ ] Testes e2e cobrindo os critérios abaixo.

## Aceite

- Todos os critérios de aceite de "Auth" na spec 01.
- E-mail com maiúsculas/espaços colide com o mesmo e-mail normalizado (`409 EMAIL_TAKEN`).
- Login com e-mail inexistente e com senha errada produzem respostas idênticas.
- Nenhum endpoint devolve hash de senha (teste verifica o corpo das respostas).
