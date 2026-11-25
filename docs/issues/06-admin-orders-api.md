# #06 — Gestão de pedidos pelo admin (API)

**Objetivo:** admin lista pedidos e avança seus status.

**Specs:** [04-orders-checkout](../specs/04-orders-checkout.md)

## Tarefas

- [ ] `GET /api/admin/orders` com filtro de status e busca por número ou e-mail.
- [ ] `GET /api/admin/orders/:id` com dados do cliente.
- [ ] `POST /api/admin/orders/:id/status` usando a mesma máquina de estados da #05; cancelamento devolve estoque.
- [ ] Testes e2e.

## Aceite

- Caminho completo `AWAITING_PAYMENT → CONFIRMED → SHIPPED → DELIVERED` funciona e aparece em `statusHistory`.
- Toda transição inválida → `409 INVALID_STATUS_TRANSITION`.
- Cliente chamando `/api/admin/orders` → `403`.
