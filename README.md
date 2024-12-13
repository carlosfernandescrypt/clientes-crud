# CRUD de Clientes - API e Front-End

Este projeto implementa um sistema de gerenciamento de clientes com um front-end desenvolvido em React e um back-end em Java com Spring Boot. Ele permite cadastrar, listar, editar e excluir clientes.

## Estrutura do Projeto

1. **Back-end**:
   - Linguagem: Java
   - Framework: Spring Boot
   - Gerenciador de dependências: Gradle
   - Banco de dados: H2

2. **Front-end**:
   - Tecnologias: React.js, Tailwind CSS, NPM
   - Integração com a API via requisições HTTP


## Configuração do Ambiente

### Back-end

1. Clone o repositório:
   ```bash
   git clone https://github.com/carlosfernandescrypt/clientes-crud.git
   cd clientes-backend
   ```

2. Configure o banco de dados (Atualmente rodando na memoria, mas sinta-se livre para utilizar MySQL):
   - Crie um banco de dados MySQL chamado `clientes_db`.
   - Configure o `application.properties` para apontar para seu banco:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/clientes_db
     spring.datasource.username=SEU_USUARIO
     spring.datasource.password=SUA_SENHA
     spring.jpa.hibernate.ddl-auto=update
     ```

3. Execute o back-end:
   ```bash
   ./gradlew bootRun
   ```

O servidor iniciará em `http://localhost:8080`.

### Front-end

1. Acesse o diretório do front-end:
   ```bash
   cd clientes-frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn
   ```

3. Configure a URL da API no arquivo `src/api.js`:
   ```javascript
   export const BASE_URL = "http://localhost:8080";
   ```

4. Inicie o front-end:
   ```bash
   npm start
   ```
   ou
   ```bash
   yarn start
   ```

O front-end estará disponível em `http://localhost:3000`.

---


## Autenticação e Segurança

A API utiliza autenticação baseada em Basic Auth. Após o login bem-sucedido, as credenciais são incorporadas em base 64 no formato usuário:senha no Header da requisição HTTP no cabeçalho `Authorization` de todas as requisições subsequentes.

Exemplo de cabeçalho:

```
Authorization: Basic {credenciais em base 64 no formato usuário:senha}
```

### Endpoints da API

#### Autenticação

- **POST /login**

  Realiza a autenticação do usuário e incoporta um Authorization no cabeçalho.

  - **Body (JSON):**

    ```json
    {
      "username": "usuario",
      "password": "senha"
    }
    ```

  - **Resposta (200):**

    ```json
    {
      "token": "Basic_Authorization"
    }
    ```

#### Clientes

- **GET /clientes**

  Retorna a lista de todos os clientes.

  - **Resposta (200):**

    ```json
    [
      {
        "id": 1,
        "nome": "João Silva",
        "email": "joao@email.com",
        "telefone": "(11) 99999-9999"
      }
    ]
    ```

- **GET /clientes/{id}**

  Retorna os dados de um cliente especificado pelo ID.

  - **Resposta (200):**

    ```json
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com",
      "telefone": "(11) 99999-9999"
    }
    ```

- **POST /clientes**

  Cria um novo cliente.

  - **Body (JSON):**

    ```json
    {
      "nome": "João Silva",
      "email": "joao@email.com",
      "telefone": "(11) 99999-9999"
    }
    ```

  - **Resposta (201):**

    ```json
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com",
      "telefone": "(11) 99999-9999"
    }
    ```

- **PUT /clientes/{id}**

  Atualiza os dados de um cliente.

  - **Body (JSON):**

    ```json
    {
      "nome": "João Atualizado",
      "email": "joao.atualizado@email.com",
      "telefone": "(11) 98888-8888"
    }
    ```

  - **Resposta (200):**

    ```json
    {
      "id": 1,
      "nome": "João Atualizado",
      "email": "joao.atualizado@email.com",
      "telefone": "(11) 98888-8888"
    }
    ```

- **DELETE /clientes/{id}**

  Remove um cliente pelo ID.

  - **Resposta (204):** Sem conteúdo.

## Testes da API

Os endpoints podem ser testados utilizando ferramentas como Postman ou cURL. Certifique-se de incluir o Basic Auth no Authorization das requisições.

Exemplo com cURL:

```bash
curl -X GET http://localhost:8080/clientes \
  -H "Authorization: Basic {credenciais em base 64 no formato usuário:senha}"
```

## Documentação do Front-End

O front-end interage com os endpoints do back-end para fornecer as seguintes funcionalidades:

- Exibição da lista de clientes.
- Cadastro de novos clientes. (visíveis apenas para o usuário `admin`).
- Edição de clientes existentes. (visíveis apenas para o usuário `admin`).
- Remoção de clientes. (visíveis apenas para o usuário `admin`).


## Testes

### Back-end

Utiliza JUnit para testes unitários e de integração. Execute os testes com:

```bash
./gradlew test
```

