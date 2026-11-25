# #09 — Catálogo: listagem e detalhe (UI)

**Objetivo:** visitante encontra produtos e vê detalhes.

**Specs:** [05-frontend](../specs/05-frontend.md), [02-catalog](../specs/02-catalog.md)

## Tarefas

- [ ] Página `/` com grade de produtos, busca, filtro por categoria, faixa de preço, "só em estoque", ordenação e paginação.
- [ ] Estado de filtros sincronizado com a query string.
- [ ] Página `/products/:slug` com seletor de quantidade limitado ao estoque.
- [ ] **Adicionar ao carrinho**: visitante vai para o login; cliente adiciona (a integração real chega na #10 — aqui pode chamar a API do carrinho direto se ela já existir).
- [ ] Produto sem estoque: selo "Esgotado" e botão desabilitado.
- [ ] Estados de carregamento, erro, vazio ("Nenhum produto encontrado") e 404 de produto.
- [ ] Testes de componente.

## Aceite

- Aplicar filtros, copiar a URL e abrir em outra aba mostra o mesmo resultado.
- Voltar no navegador restaura o filtro anterior.
- Layout funciona em 360px.
