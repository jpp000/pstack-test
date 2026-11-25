# Spec 01 — Contas: usuários, clientes e endereços

Termos em [domain.md](../domain.md). Convenções em [00-api-conventions.md](00-api-conventions.md).

## Regras

- E-mail é único, comparado em minúsculas e sem espaços nas pontas.
- Senha: mínimo 8 caracteres. Armazenada só como hash (bcrypt ou argon2).
- Cadastro público cria sempre `User` com `role = CUSTOMER` e o `Customer` correspondente, na mesma transação.
- Não existe cadastro público de admin. O seed cria `admin@shop.local` / `admin12345`.
- Nenhuma resposta da API inclui o hash da senha.
- Endereço:
  - Campos: `label` (ex.: "Casa"), `recipientName`, `street`, `number`, `complement?`, `district`, `city`, `state` (UF, 2 letras), `zipCode` (8 dígitos, aceita entrada com hífen e guarda só dígitos).
  - O primeiro endereço criado vira `isDefault = true`.
  - Marcar um endereço como padrão desmarca o anterior.
  - Apagar o endereço padrão promove o mais recente restante, se houver.

## Endpoints

### Auth

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/api/auth/register` | público | `{ name, email, password }` → `201 { accessToken, user }`. E-mail duplicado → `409 EMAIL_TAKEN`. |
| POST | `/api/auth/login` | público | `{ email, password }` → `200 { accessToken, user }`. Credenciais erradas → `401 INVALID_CREDENTIALS` (mesma resposta para e-mail inexistente e senha errada). |
| GET | `/api/auth/me` | cliente, admin | → `{ id, email, role, customer? }`. |

`user` na resposta: `{ id, email, role }`.

### Perfil do cliente

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| GET | `/api/me/profile` | cliente | → `{ name, phone, email }`. |
| PATCH | `/api/me/profile` | cliente | `{ name?, phone? }` → perfil atualizado. E-mail não é editável. |

### Endereços

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| GET | `/api/me/addresses` | cliente | Lista, padrão primeiro. |
| POST | `/api/me/addresses` | cliente | Cria. → `201`. |
| PATCH | `/api/me/addresses/:id` | cliente | Edita campos. |
| POST | `/api/me/addresses/:id/default` | cliente | Torna padrão. |
| DELETE | `/api/me/addresses/:id` | cliente | Remove. → `204`. |

## Critérios de aceite

- Cadastro → login → `/api/auth/me` funciona com o token devolvido.
- Admin do seed loga e recebe `role = ADMIN`; chamar `/api/me/profile` como admin → `403`.
- Sempre existe no máximo um endereço padrão por cliente, em qualquer sequência de criar/editar/apagar.
- Cliente A acessando endereço do cliente B → `404`.
