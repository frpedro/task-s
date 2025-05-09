<p align="center">
  <img src="./public/tksicon.png" alt="TaskS Logo" width="70" height="70"/>
</p> 

## **TaskS** é um gerenciador pessoal inteligente que utiliza inteligência artificial para sugerir **a forma mais eficiente, prática e rápida** de executar qualquer tarefa. Seu foco é **eliminar a complexidade desnecessária**.

---

## Funcionalidade

- O usuário insere uma tarefa que deseja realizar.
- A IA analisa e retorna a **melhor forma de executá-la**, com sugestões estratégicas e diretas.
- O usuário pode salvar o insight recebido ou realizar uma nova consulta.

---

## Stack 

- **Back-end**: Node.js + Fastify
- **IA**: Mistral 7B Instruct (OpenRouter) 
- **Front-end**: Bootstrap + CSS
- **Banco de Dados**: PostgreSQL

---

## Bibliotecas Utilizadas

- [`fastify`](https://www.fastify.io/) – Servidor web leve e performático
- [`dotenv`](https://github.com/motdotla/dotenv) – Gerenciamento de variáveis de ambiente
- [`pg`](https://node-postgres.com/) – Conector PostgreSQL para Node.js
- [`bootstrap`](https://getbootstrap.com/) – Framework CSS para UI responsiva
- [`openrouter`](https://openrouter.ai/) – Roteador de modelos LLM para integração com IA

---

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/tasks.git
2. Instale as dependências:
   ```bash
   npm install
3. Configure o arquivo .env com sua chave de API do OpenRouter e dados do banco PostgreSQL.   
5. Inicie o servidor:
   ```bash
   node app.js
---
## Futuras Features:
- Histórico de tarefas e insights.
