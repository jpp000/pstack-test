# Roadmap de produto

## Visão

Uma loja virtual simples, ponta a ponta: o cliente se cadastra, navega no catálogo, monta o carrinho, finaliza a compra e acompanha os pedidos; o admin cuida do catálogo e do andamento dos pedidos. **Tudo menos pagamentos.**

O projeto também é um laboratório: o objetivo secundário é avaliar o código que o pstack produz. Por isso o escopo é pequeno e fechado.

## Personas

- **Cliente**: compra produtos. Quer achar rápido, comprar sem atrito e saber onde está o pedido.
- **Admin**: opera a loja. Quer cadastrar produtos, controlar estoque e avançar pedidos.
- **Visitante**: sem login. Pode ver o catálogo, mas precisa entrar para usar o carrinho.

## Fora de escopo

- Pagamento real, gateway, PIX, boleto, cartão. O botão **Pagar** mostra só um aviso.
- Cálculo de frete, cupons, avaliações, wishlist, recomendações.
- Upload de imagem (produto usa URL de imagem).
- E-mails, notificações, recuperação de senha.
- Multi-moeda, multi-idioma, multi-loja.
- Deploy. Roda só local.

## Marcos

### M0 — Fundação
Repositório roda com um comando, backend e frontend se falam.
- [#00 Scaffold do monorepo](issues/00-scaffold.md)

### M1 — API completa
Todo o domínio exposto e testado no backend.
- [#01 Autenticação e usuários](issues/01-auth-api.md)
- [#02 Perfil do cliente e endereços](issues/02-customer-profile-api.md)
- [#03 Catálogo: categorias e produtos](issues/03-catalog-api.md)
- [#04 Carrinho](issues/04-cart-api.md)
- [#05 Checkout e pedidos do cliente](issues/05-checkout-orders-api.md)
- [#06 Gestão de pedidos pelo admin](issues/06-admin-orders-api.md)

### M2 — Loja (cliente)
Cliente faz a jornada inteira pela interface.
- [#07 Shell do frontend e fluxo de login](issues/07-frontend-shell-auth.md)
- [#08 Minha conta: perfil e endereços](issues/08-account-ui.md)
- [#09 Catálogo: listagem e detalhe](issues/09-catalog-ui.md)
- [#10 Carrinho](issues/10-cart-ui.md)
- [#11 Checkout, pedidos e botão Pagar](issues/11-checkout-orders-ui.md)

### M3 — Backoffice
Admin gerencia produtos, categorias e o andamento dos pedidos pela interface.
- [#12 Backoffice do admin](issues/12-admin-ui.md)

## Ordem e dependências

Execução sequencial, uma issue por vez, na ordem numérica. Cada issue depende só de issues com número menor:

| Issue | Depende de |
|---|---|
| 00 | — |
| 01 | 00 |
| 02 | 01 |
| 03 | 01 |
| 04 | 02, 03 |
| 05 | 04 |
| 06 | 05 |
| 07 | 01 |
| 08 | 02, 07 |
| 09 | 03, 07 |
| 10 | 04, 09 |
| 11 | 05, 08, 10 |
| 12 | 03, 06, 07 |

## Referências

- [Modelo de domínio](domain.md): glossário, invariantes, máquina de estados.
- [Specs](specs/): regras e contratos de API por domínio.
- [Issues](issues/): unidades de trabalho com tarefas e critérios de aceite.
