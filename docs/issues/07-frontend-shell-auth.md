# #07 — Shell do frontend e fluxo de login

**Objetivo:** app com navegação, sessão e proteção de rotas; cliente consegue se cadastrar e entrar.

**Specs:** [05-frontend](../specs/05-frontend.md), [01-accounts](../specs/01-accounts.md)

## Tarefas

- [ ] Roteamento com as rotas da spec 05 (páginas ainda não implementadas podem ser placeholders).
- [ ] Cliente HTTP único: injeta o token, converte erros da API num tipo de erro com o código `error`, e trata `401` limpando a sessão.
- [ ] Tipos TypeScript das respostas da API usadas no front.
- [ ] Estado de sessão (usuário atual, papel) acessível no app inteiro; restauração ao recarregar.
- [ ] Páginas `/login` e `/register` com validação e mensagens de erro por código.
- [ ] Proteção de rotas por papel, com redirect de volta após login.
- [ ] Layout com header da spec 05.
- [ ] Mapeamento central de código de erro → mensagem em português.
- [ ] Testes de componente para login/cadastro e para a proteção de rotas.

## Aceite

- Cadastrar → cai logado na página de origem; recarregar mantém a sessão; sair limpa.
- Visitante em `/cart` vai para `/login?redirect=/cart` e volta após entrar.
- Admin vê o link Backoffice e não vê o carrinho.
- Componentes de apresentação seguem a regra do `CLAUDE.md`.
