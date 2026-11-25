# Spec 03 — Carrinho

Termos em [domain.md](../domain.md). Convenções em [00-api-conventions.md](00-api-conventions.md).

## Regras

- Um carrinho por cliente, criado sob demanda no primeiro acesso.
- Só clientes têm carrinho. Visitante que tenta adicionar é mandado para o login pela UI.
- Quantidade por item: inteiro de 1 a 99 e nunca acima do estoque atual do produto.
- Adicionar um produto que já está no carrinho soma à quantidade existente (limitado pelas regras acima).
- Produto inativo não pode ser adicionado → `409 PRODUCT_UNAVAILABLE`.
- Quantidade acima do estoque → `409 INSUFFICIENT_STOCK` com `details.available`.
- O carrinho guarda só referência + quantidade. Preço e nome vêm sempre do produto atual (o snapshot só acontece no checkout).
- Ao ler o carrinho, cada item informa se ainda é comprável: `issue` é `null`, `"UNAVAILABLE"` (produto inativo) ou `"INSUFFICIENT_STOCK"` (estoque caiu abaixo da quantidade). Ler o carrinho não altera os itens.

## Endpoints

Todos com acesso **cliente**.

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/cart` | Carrinho atual. |
| POST | `/api/cart/items` | `{ productId, quantity }` adiciona ou soma. → carrinho. |
| PATCH | `/api/cart/items/:productId` | `{ quantity }` define a quantidade. → carrinho. |
| DELETE | `/api/cart/items/:productId` | Remove o item. → carrinho. |
| DELETE | `/api/cart` | Esvazia. → carrinho vazio. |

Resposta do carrinho:

```json
{
  "items": [
    {
      "product": { "id": "…", "name": "…", "slug": "…", "priceCents": 4990, "imageUrl": "…", "stock": 7 },
      "quantity": 2,
      "lineTotalCents": 9980,
      "issue": null
    }
  ],
  "itemCount": 2,
  "subtotalCents": 9980,
  "canCheckout": true
}
```

- `itemCount` soma as quantidades.
- `canCheckout` é `true` quando há ao menos um item e nenhum tem `issue`.

## Critérios de aceite

- Adicionar o mesmo produto duas vezes resulta em um item com a quantidade somada.
- Admin desativa um produto que está no carrinho → o item aparece com `issue = "UNAVAILABLE"` e `canCheckout = false`.
- Cliente A nunca vê o carrinho do cliente B.
