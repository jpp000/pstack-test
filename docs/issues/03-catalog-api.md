# #03 — Catálogo: categorias e produtos (API)

**Objetivo:** catálogo público navegável e gerenciável pelo admin, com dados de exemplo.

**Specs:** [02-catalog](../specs/02-catalog.md)

## Tarefas

- [ ] Entidades `Category` e `Product` com migration.
- [ ] Geração de slug (sem acento, minúsculas, hífen).
- [ ] Endpoints públicos: categorias, listagem com filtros/ordenação/paginação, detalhe por slug.
- [ ] Endpoints de admin para categorias e produtos.
- [ ] Desativação lógica de produto; bloqueio de apagar categoria com produtos.
- [ ] Seed idempotente de categorias e produtos conforme a spec.
- [ ] Testes: unidade para slug; e2e para filtros combinados, permissões e regras de exclusão.

## Aceite

- Critérios de aceite da spec 02.
- `pnpm seed` duas vezes seguidas não duplica nada.
