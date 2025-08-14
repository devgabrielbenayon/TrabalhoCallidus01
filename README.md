# 🍕 pizzaria-app

Aplicação front-end para gerenciamento de uma pizzaria, com funcionalidades voltadas para clientes, cozinha, entregadores e administradores. Desenvolvido com foco em boas práticas de React, incluindo autenticação, rotas protegidas, Context API, componentização e comunicação com backend.

---

## 🧠 Objetivos Educacionais

Este projeto foi desenvolvido como parte de um exercício prático, proposto pelo Prof. Emmerson para fixação dos seguintes conteúdos:

- 🔐 Autenticação de usuários e rotas protegidas
- ⚛️ Gerenciamento de estado global com Context API
- 🧩 Componentização e reuso de código
- 🔌 Comunicação com API/backend
- 🗂️ Estrutura modular e organização de projetos React
- 🧠 UX e boas práticas de desenvolvimento front-end

# Fluxograma do Aplicativo da Pizzaria  

```mermaid
flowchart TD
    A[Início] --> B[Login]
    B --> C{Usuário}
    C -->|Cliente| D[Cardápio]
    D --> E[Adicionar ao Carrinho]
    E --> F[Visualizar Carrinho]
    F --> G{Finalizar Pedido?}
    G -->|Sim| H[Pedido Confirmado]
    G -->|Não| D
    H --> I[Acompanhar Pedido]
    I --> J[Pedido Entregue]
    J --> K[Fim]

    C -->|Cozinha| L[Ver Pedidos Pendentes]
    L --> M[Preparar Pedido]
    M --> N[Pedido Pronto]
    N --> O[Entregar Pedido]
    O --> P[Fim]

    C -->|Admin| Q[Gerenciar Cardápio]
    Q --> R[Adicionar/Editar/Remover Itens]
    C -->|Admin| S[Gerenciar Usuários]
    S --> T[Adicionar/Editar Permissões]
    C -->|Admin| U[Relatórios de Vendas]
    U --> V[Analisar Dados]
    V --> W[Fim]
```