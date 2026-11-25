# Spec 02 — Catálogo: categorias e produtos

Termos em [domain.md](../domain.md). Convenções em [00-api-conventions.md](00-api-conventions.md).

## Regras

- `Category`: `name` (único), `slug` (único, gerado do nome se não enviado).
- `Product`: `name`, `slug` (único, gerado do nome se não enviado), `description`, `priceCents` (> 0), `stock` (>= 0), `imageUrl` (URL http/https), `categoryId`, `isActive` (padrão `true`).
- Slug: minúsculas, sem acento, palavras separadas por hífen. Ex.: "Caneca Térmica 500ml" → `caneca-termica-500ml`.
- Categoria com produtos não pode ser apagada → `409 CATEGORY_NOT_EMPTY`.
- Produto não é apagado fisicamente: "remover" é `isActive = false`, porque pedidos antigos referenciam o produto.
- Catálogo público mostra só produtos com `isActive = true`. Produto inativo pelo slug público → `404`.
- `inStock` no catálogo público é derivado (`stock > 0`); o número exato de estoque é exposto também, para a UI limitar a quantidade.

## Endpoints públicos

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/categories` | Todas as categorias, ordem alfabética. Sem paginação. |
| GET | `/api/products` | Paginado. Filtros: `q` (busca em nome e descrição, sem diferenciar maiúsculas), `category` (slug), `minPriceCents`, `maxPriceCents`, `inStock=true`. Ordenação `sort`: `newest` (padrão), `price_asc`, `price_desc`, `name_asc`. |
| GET | `/api/products/:slug` | Detalhe com categoria embutida. |

Item de produto público: `{ id, name, slug, description, priceCents, stock, inStock, imageUrl, category: { id, name, slug } }`.

## Endpoints de admin

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/admin/categories` | Cria. Nome/slug duplicado → `409 CATEGORY_EXISTS`. |
| PATCH | `/api/admin/categories/:id` | Renomeia. |
| DELETE | `/api/admin/categories/:id` | Apaga se vazia. |
| GET | `/api/admin/products` | Paginado, inclui inativos. Mesmos filtros do público + `isActive`. |
| POST | `/api/admin/products` | Cria. Slug duplicado → `409 PRODUCT_SLUG_TAKEN`. |
| PATCH | `/api/admin/products/:id` | Edita qualquer campo, inclusive `isActive` e `stock`. |

## Seed

- 4 categorias (ex.: Casa, Escritório, Cozinha, Acessórios).
- 24 produtos distribuídos entre elas, com preços variados, pelo menos 2 sem estoque e 1 inativo.
- `imageUrl` aponta para um serviço de placeholder estável (ex.: `https://picsum.photos/seed/<slug>/600/600`).

## Critérios de aceite

- Busca `q=caneca` acha "Caneca Térmica" e não acha produtos inativos.
- Combinação de filtros e ordenação funciona junto com paginação, e `total` reflete os filtros.
- Cliente chamando `/api/admin/*` → `403`.
