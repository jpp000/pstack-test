# #04 — Carrinho (API)

**Objetivo:** cliente monta um carrinho persistente com validação de estoque.

**Specs:** [03-cart](../specs/03-cart.md)

## Tarefas

- [ ] Entidades `Cart` e `CartItem` com migration.
- [ ] Endpoints de `/api/cart` conforme a spec.
- [ ] Cálculo de `lineTotalCents`, `subtotalCents`, `itemCount`, `issue` por item e `canCheckout`.
- [ ] Testes e2e.

## Aceite

- Critérios de aceite da spec 03.
- Quantidade 0, negativa, acima de 99 ou acima do estoque é rejeitada com o código certo.
