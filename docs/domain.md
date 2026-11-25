# Modelo de domínio

Fonte única dos termos do produto. Código usa os nomes em inglês da coluna **Termo**; docs e UI podem usar o português.

## Glossário

| Termo | PT | Definição |
|---|---|---|
| `User` | Usuário | Conta de acesso: e-mail, senha (hash) e `role`. Toda pessoa que faz login é um `User`. |
| `Role` | Papel | `CUSTOMER` ou `ADMIN`. Um `User` tem exatamente um. |
| `Customer` | Cliente | Perfil de compra de um `User` com papel `CUSTOMER`: nome, telefone, endereços. Relação 1:1 com `User`, criado no cadastro. |
| `Address` | Endereço | Endereço de entrega de um `Customer`. Um `Customer` tem 0..N; no máximo um é `isDefault`. |
| `Category` | Categoria | Agrupamento plano de produtos (sem hierarquia). Nome e `slug` únicos. |
| `Product` | Produto | Item vendável: nome, `slug` único, descrição, preço, estoque, imagem (URL), categoria, `isActive`. |
| `Cart` | Carrinho | Itens que um `Customer` pretende comprar. Um carrinho por `Customer`, persistido no backend. |
| `CartItem` | Item do carrinho | Par `Product` + quantidade dentro de um `Cart`. Um produto aparece no máximo uma vez por carrinho. |
| `Checkout` | Compra / finalizar compra | Ação que transforma o `Cart` em um `Order`. Não é entidade. |
| `Order` | Pedido | Registro imutável do que foi comprado: itens, endereço de entrega, totais e `status`. |
| `OrderItem` | Item do pedido | Cópia (snapshot) de nome, preço unitário e quantidade no momento do checkout. Não muda se o `Product` mudar depois. |
| `OrderStatus` | Status do pedido | Ver máquina de estados abaixo. |
| `Money` | Dinheiro | Inteiro em centavos (`priceCents`, `totalCents`). Moeda única: BRL. |

## Invariantes

- `Money` é sempre inteiro em centavos. Formatação para `R$ 12,34` acontece só na UI.
- Estoque nunca fica negativo. O checkout reserva (decrementa) o estoque de todos os itens na mesma transação; se algum item não tiver estoque, nenhum é decrementado e o checkout falha.
- Cancelar um pedido devolve o estoque de todos os itens.
- `OrderItem` guarda snapshot de `productName` e `unitPriceCents`; o pedido mostra sempre esses valores.
- O endereço de entrega do pedido também é snapshot (copiado do `Address`), não referência.
- `Product` com `isActive = false` some do catálogo público e não pode ser adicionado ao carrinho, mas continua aparecendo em pedidos antigos.
- Um `User` `ADMIN` não tem `Customer`, carrinho nem pedidos.

## Máquina de estados do pedido

```
            checkout
               │
               ▼
   ┌──── AWAITING_PAYMENT ────┐
   │                          │ cliente ou admin cancela
   │ admin confirma           ▼
   ▼                       CANCELED
CONFIRMED ──────────────────► CANCELED   (só admin)
   │ admin despacha
   ▼
SHIPPED
   │ admin marca entregue
   ▼
DELIVERED
```

- Transições fora deste diagrama são rejeitadas com erro de domínio (HTTP 409).
- `AWAITING_PAYMENT` é o estado inicial. Pagamento não existe: o botão **Pagar** só mostra um aviso (ver [specs/04-orders-checkout.md](specs/04-orders-checkout.md)), e quem move o pedido para `CONFIRMED` é o admin.
- `SHIPPED` e `DELIVERED` não podem ser cancelados.
