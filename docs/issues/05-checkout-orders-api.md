# #05 — Checkout e pedidos do cliente (API)

**Objetivo:** cliente transforma o carrinho em pedido, acompanha e cancela.

**Specs:** [04-orders-checkout](../specs/04-orders-checkout.md), [domain](../domain.md#máquina-de-estados-do-pedido)

## Tarefas

- [ ] Entidades `Order`, `OrderItem` e histórico de status, com migration; `number` sequencial a partir de 1001.
- [ ] Máquina de estados do pedido num único lugar, usada por toda transição (cliente e admin).
- [ ] `POST /api/checkout` transacional, com snapshot de itens e endereço.
- [ ] `GET /api/orders`, `GET /api/orders/:id`, `POST /api/orders/:id/cancel` com devolução de estoque.
- [ ] Testes: unidade para a máquina de estados (todas as transições válidas e inválidas); e2e para checkout e cancelamento.

## Aceite

- Critérios de aceite da spec 04 referentes a checkout e cliente.
- Teste de concorrência: dois checkouts pela última unidade → um `201`, um `409`, estoque final 0.
