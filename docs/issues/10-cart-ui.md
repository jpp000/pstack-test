# #10 — Carrinho (UI)

**Objetivo:** cliente gerencia o carrinho com feedback de estoque.

**Specs:** [05-frontend](../specs/05-frontend.md), [03-cart](../specs/03-cart.md)

## Tarefas

- [ ] Estado do carrinho compartilhado (header e páginas), atualizado após cada mutação.
- [ ] Adicionar ao carrinho a partir do detalhe do produto, com confirmação visual.
- [ ] Página `/cart`: alterar quantidade, remover, esvaziar, subtotal.
- [ ] Aviso por item com `issue` e botão **Finalizar compra** desabilitado quando `canCheckout = false`.
- [ ] Estado vazio com link para o catálogo.
- [ ] Testes de componente.

## Aceite

- Contador do header muda imediatamente ao adicionar/remover.
- Tentar quantidade acima do estoque mostra a mensagem do código `INSUFFICIENT_STOCK` com o disponível.
