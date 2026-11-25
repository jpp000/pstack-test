# Spec 04 — Checkout e pedidos

Termos e máquina de estados em [domain.md](../domain.md). Convenções em [00-api-conventions.md](00-api-conventions.md).

## Checkout

`POST /api/checkout` (cliente) com `{ addressId }`:

1. Carrega o carrinho do cliente. Vazio → `409 CART_EMPTY`.
2. Carrega o endereço; precisa pertencer ao cliente → senão `404`.
3. Em **uma transação**:
   - valida cada item (ativo, estoque suficiente); qualquer falha aborta tudo com `409 PRODUCT_UNAVAILABLE` ou `409 INSUFFICIENT_STOCK` (com `details.productId` e `details.available`);
   - decrementa o estoque de cada produto;
   - cria o `Order` com status `AWAITING_PAYMENT`, snapshot do endereço e um `OrderItem` por item (snapshot de `productName` e `unitPriceCents`);
   - esvazia o carrinho.
4. Responde `201` com o pedido.

Dois checkouts concorrentes disputando a última unidade: exatamente um vence, o outro recebe `409 INSUFFICIENT_STOCK`, e o estoque termina em 0.

## Pedido

```json
{
  "id": "…",
  "number": 1042,
  "status": "AWAITING_PAYMENT",
  "items": [
    { "productId": "…", "productName": "Caneca Térmica", "unitPriceCents": 4990, "quantity": 2, "lineTotalCents": 9980 }
  ],
  "subtotalCents": 9980,
  "shippingCents": 0,
  "totalCents": 9980,
  "shippingAddress": { "recipientName": "…", "street": "…", "number": "…", "complement": null, "district": "…", "city": "…", "state": "SP", "zipCode": "01001000" },
  "createdAt": "…",
  "statusHistory": [ { "status": "AWAITING_PAYMENT", "at": "…" } ]
}
```

- `number` é sequencial e legível (começa em 1001), além do UUID.
- `shippingCents` é sempre 0 (frete fora de escopo), mas o campo existe.
- `statusHistory` registra cada transição em ordem.

## Endpoints do cliente

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/checkout` | Ver acima. |
| GET | `/api/orders` | Pedidos do cliente, paginado, mais recente primeiro. Item da lista: `{ id, number, status, totalCents, itemCount, createdAt }`. |
| GET | `/api/orders/:id` | Detalhe. Pedido de outro cliente → `404`. |
| POST | `/api/orders/:id/cancel` | Cancela se `AWAITING_PAYMENT`; senão `409 INVALID_STATUS_TRANSITION`. Devolve estoque. |

## Endpoints do admin

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/admin/orders` | Todos os pedidos, paginado. Filtros: `status`, `q` (número do pedido ou e-mail do cliente). Item inclui `customer: { name, email }`. |
| GET | `/api/admin/orders/:id` | Detalhe com dados do cliente. |
| POST | `/api/admin/orders/:id/status` | `{ status }`. Aplica a transição se permitida pela máquina de estados, senão `409 INVALID_STATUS_TRANSITION`. Ir para `CANCELED` devolve estoque. |

## Pagamento (não implementado)

Não existe endpoint de pagamento. Na UI, o pedido em `AWAITING_PAYMENT` tem o botão **Pagar**; ao clicar, abre um aviso (modal ou toast, com o visual da loja, não `window.alert`) dizendo:

> **Pagamentos indisponíveis**
> Esta loja é uma demonstração e não processa pagamentos. Seu pedido #1042 continua reservado.

O aviso só fecha; não muda nada no pedido.

## Critérios de aceite

- Checkout com sucesso: estoque decrementado, carrinho vazio, pedido com snapshot correto.
- Mudar preço/nome do produto depois não altera o pedido.
- Checkout com um item sem estoque não altera nenhum estoque nem o carrinho.
- Cancelar devolve exatamente as quantidades ao estoque.
- Toda transição fora do diagrama responde `409`; todas as do diagrama funcionam.
