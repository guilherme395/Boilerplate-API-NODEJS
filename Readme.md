
# API de Usuários

## Endpoints

### 1. Obter todos os usuários
- **Método:** `GET`  
- **URL:** `/users`  
- **Descrição:** Retorna todos os usuários cadastrados.

#### Resposta:
```json
{
  "success": true,
  "message": "Returned all users.",
  "data": [
    {
      "id": 1,
      "name": "João",
      "email": "joao@example.com",
      "pass": "password123"
    }
  ]
}
```

---

### 2. Obter usuário por ID
- **Método:** `GET`  
- **URL:** `/user/:id`  
- **Descrição:** Retorna os detalhes de um usuário específico baseado no ID fornecido.

#### Parâmetros:
- `:id` - ID do usuário.

#### Resposta:
```json
{
  "success": true,
  "message": "User returned successfully.",
  "user": {
    "id": 1,
    "name": "João",
    "email": "joao@example.com",
    "pass": "password123"
  }
}
```

---

### 3. Criar novo usuário
- **Método:** `POST`  
- **URL:** `/user`  
- **Descrição:** Cria um novo usuário com nome, email e senha.

#### Corpo da Requisição:
```json
{
  "name": "Maria",
  "email": "maria@example.com",
  "pass": "password456"
}
```

#### Resposta:
```json
{
  "success": true,
  "message": "User created successfully.",
  "data": {
    "id": 2,
    "name": "Maria",
    "email": "maria@example.com",
    "pass": "password456"
  }
}
```

---

### 4. Atualizar usuário existente
- **Método:** `PUT`  
- **URL:** `/user/:id`  
- **Descrição:** Atualiza os dados de um usuário existente com base no ID fornecido.

#### Parâmetros:
- `:id` - ID do usuário.

#### Corpo da Requisição:
```json
{
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "pass": "newpassword123"
}
```

#### Resposta:
```json
{
  "success": true,
  "message": "User updated successfully.",
  "data": {
    "id": 1,
    "name": "João Silva",
    "email": "joao.silva@example.com",
    "pass": "newpassword123"
  }
}
```

---

### 5. Deletar usuário
- **Método:** `DELETE`  
- **URL:** `/user/:id`  
- **Descrição:** Deleta um usuário baseado no ID fornecido.

#### Parâmetros:
- `:id` - ID do usuário.

#### Resposta:
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```
