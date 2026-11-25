# Spec 05 — Frontend

Regras de arquitetura do frontend (container/presentation) estão em [`CLAUDE.md`](../../CLAUDE.md). Aqui ficam páginas, fluxos e UX.

## Rotas

| Rota | Acesso | Conteúdo |
|---|---|---|
| `/` | público | Catálogo: busca, filtro por categoria, faixa de preço, "só em estoque", ordenação, paginação. Estado dos filtros na URL (query string), para o link ser compartilhável e o voltar do navegador funcionar. |
| `/products/:slug` | público | Detalhe: imagem, nome, preço, descrição, estoque, seletor de quantidade, **Adicionar ao carrinho**. |
| `/login`, `/register` | público | Formulários. Após entrar, volta para a página de origem. |
| `/cart` | cliente | Itens, alterar quantidade, remover, subtotal, avisos por item com `issue`, **Finalizar compra** desabilitado se `canCheckout = false`. |
| `/checkout` | cliente | Escolher endereço (padrão pré-selecionado; atalho para cadastrar um novo), resumo do pedido, **Confirmar pedido**. Sucesso → `/orders/:id`. |
| `/orders` | cliente | Lista de pedidos com status. |
| `/orders/:id` | cliente | Detalhe, linha do tempo de status, **Pagar** (aviso) e **Cancelar** quando `AWAITING_PAYMENT`. |
| `/account` | cliente | Perfil (nome, telefone) e CRUD de endereços. |
| `/admin/products` | admin | Tabela com busca, filtro ativo/inativo; criar/editar produto; ativar/desativar. |
| `/admin/categories` | admin | CRUD de categorias. |
| `/admin/orders` | admin | Tabela com filtro de status e busca; detalhe com botões só para as transições válidas. |

- Rota protegida sem login → `/login?redirect=<rota>`.
- Admin entrando em rota de cliente, ou cliente em rota de admin → página "sem permissão".
- Header: logo, busca, link de conta/login, ícone do carrinho com `itemCount` (só para clientes), link **Backoffice** (só para admin).

## UX obrigatória

- Toda chamada assíncrona mostra estado de carregamento e de erro; listas vazias têm estado vazio com próxima ação ("Seu carrinho está vazio — ver produtos").
- Erros da API viram mensagem pelo código `error` (ver spec 00), em português.
- Dinheiro sempre formatado `R$ 1.234,56` (`Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`).
- Status do pedido com rótulo e cor: Aguardando pagamento, Confirmado, Enviado, Entregue, Cancelado.
- Ações destrutivas (cancelar pedido, apagar endereço, desativar produto) pedem confirmação em diálogo da própria UI.
- Funciona em largura de celular (360px) e desktop.

## Sessão

- Token guardado no `localStorage`, carregado ao abrir o app; `401` em qualquer chamada limpa a sessão e manda para o login.
- O contador do carrinho atualiza após qualquer mudança no carrinho, sem recarregar a página.
