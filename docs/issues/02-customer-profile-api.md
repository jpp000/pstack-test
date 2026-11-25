# #02 — Perfil do cliente e endereços (API)

**Objetivo:** cliente edita o próprio perfil e gerencia endereços de entrega.

**Specs:** [01-accounts](../specs/01-accounts.md)

## Tarefas

- [ ] Entidade `Address` com migration.
- [ ] `GET`/`PATCH /api/me/profile`.
- [ ] CRUD de `/api/me/addresses` e `POST /api/me/addresses/:id/default`.
- [ ] Normalização de `zipCode` (só dígitos) e validação de `state` (UF).
- [ ] Regras de endereço padrão (primeiro vira padrão, troca desmarca o anterior, apagar o padrão promove outro).
- [ ] Testes e2e.

## Aceite

- Critérios de aceite de perfil e endereços na spec 01.
- Teste que executa uma sequência de criar/marcar padrão/apagar e verifica, a cada passo, que há no máximo um padrão.
- Admin chamando qualquer rota `/api/me/*` → `403`.
