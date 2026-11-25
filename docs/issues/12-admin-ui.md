# #12 — Backoffice do admin (UI)

**Objetivo:** admin opera catálogo e pedidos pela interface.

**Specs:** [05-frontend](../specs/05-frontend.md), [02-catalog](../specs/02-catalog.md), [04-orders-checkout](../specs/04-orders-checkout.md)

## Tarefas

- [ ] Layout de backoffice com navegação entre Produtos, Categorias e Pedidos.
- [ ] `/admin/products`: tabela paginada com busca e filtro ativo/inativo; formulário de criar/editar (preço digitado em reais, enviado em centavos); ativar/desativar com confirmação.
- [ ] `/admin/categories`: CRUD, com mensagem clara para `CATEGORY_NOT_EMPTY`.
- [ ] `/admin/orders`: tabela com filtro de status e busca; detalhe mostrando só os botões das transições válidas a partir do status atual.
- [ ] Testes de componente.

## Aceite

- Admin cria um produto e ele aparece no catálogo público; desativa e ele some.
- Admin leva um pedido de `AWAITING_PAYMENT` até `DELIVERED` pela UI e o cliente vê a linha do tempo atualizada.
- Cliente acessando `/admin/*` vê "sem permissão".
