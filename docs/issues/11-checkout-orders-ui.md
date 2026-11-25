# #11 — Checkout, pedidos e botão Pagar (UI)

**Objetivo:** cliente finaliza a compra e acompanha seus pedidos; **Pagar** mostra o aviso.

**Specs:** [05-frontend](../specs/05-frontend.md), [04-orders-checkout](../specs/04-orders-checkout.md)

## Tarefas

- [ ] Página `/checkout`: escolha de endereço (padrão pré-selecionado), cadastro de endereço novo inline reutilizando o formulário da #08, resumo e **Confirmar pedido**.
- [ ] Erros de estoque no checkout levam de volta ao carrinho com a mensagem.
- [ ] Página `/orders` com lista e status coloridos.
- [ ] Página `/orders/:id` com itens, endereço, totais e linha do tempo de status.
- [ ] Botão **Pagar** abre o aviso de pagamento indisponível com o texto da spec 04 (componente da UI, não `window.alert`).
- [ ] Botão **Cancelar** com confirmação, só em `AWAITING_PAYMENT`.
- [ ] Testes de componente, incluindo o aviso de pagamento.

## Aceite

- Jornada completa: catálogo → carrinho → checkout → pedido criado → Pagar mostra o aviso → Cancelar muda o status e o estoque volta (visível no catálogo).
- O aviso de Pagar não altera o pedido.
