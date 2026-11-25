# Shop

E-commerce local: backend NestJS + TypeORM (SQLite), frontend Vite + React. Tudo em TypeScript `strict`. Monorepo pnpm com `backend/` e `frontend/`.

## Onde está o quê

- [`docs/roadmap.md`](docs/roadmap.md): visão, escopo, marcos e ordem das issues.
- [`docs/domain.md`](docs/domain.md): glossário, invariantes e máquina de estados do pedido. Leia antes de criar ou renomear qualquer entidade, tipo ou campo.
- [`docs/specs/`](docs/specs/): regras e contratos de API por domínio. A spec é a fonte da verdade; em conflito com uma issue, a spec vence.
- [`docs/issues/`](docs/issues/): unidades de trabalho. Ao implementar uma issue, leia as specs que ela cita antes de escrever código.

## Regras do projeto

- **Nomes do domínio**: código usa exatamente os termos em inglês de `docs/domain.md` (`Customer`, `Order`, `OrderItem`...). Conceito novo entra primeiro no glossário.
- **Dinheiro** é inteiro em centavos (`*Cents`) do banco até a UI; só a camada de exibição formata em BRL.
- **Pagamento não existe.** O botão **Pagar** abre um aviso na UI e nada mais. Sem endpoint, entidade ou status de pagamento.
- **Estrutura de pastas** dentro de `backend/` e `frontend/` é decisão de quem implementa a #00. Ao escolher, registre o layout e o motivo no `README.md` do pacote; as issues seguintes seguem esse registro.
- **Texto**: código, identificadores e commits em inglês; textos da UI e mensagens de erro da API em português.

## Frontend: container / presentation

Todo componente de tela é um de dois tipos:

- **Container**: busca e muta dados, lê sessão/rota/estado global, trata loading e erro, e repassa tudo por props. Renderiza só componentes de apresentação, com o mínimo de markup próprio.
- **Presentation**: função pura de props → UI. Recebe dados e callbacks (`onSubmit`, `onRemove`...) por props; estado local permitido só para UI efêmera (input controlado, aberto/fechado). Testável renderizando com props, sem mock de rede.

A fronteira fica no nome ou no arquivo, de forma consistente no projeto inteiro (ex.: `CartPageContainer` + `CartPage`). Hooks de dados são chamados por containers.

## Pronto é

Uma issue está pronta quando todos os critérios de **Aceite** passam e `pnpm test`, `pnpm lint` e `pnpm typecheck` rodam verdes na raiz. Cada critério de aceite da API tem um teste e2e que o prova.
