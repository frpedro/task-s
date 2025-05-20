import { db } from '../db/index.js';
import { fastify } from 'fastify';
import { getAIResponse } from '../services/api.js';

export async function taskRoutes(server) {
  server.post('/task', async (request, reply) => {
    
    // Pegando a entrada da tarefa do corpo da requisição (request.body)
    const { input_msg } = request.body;

    // Verificando se a mensagem foi passada. Caso contrário, retornamos erro.
    if (!input_msg) {
      return reply.status(400).send({ error: 'Mensagem da tarefa é obrigatória.' });
    }

    // Busca a resposta da IA 
    const ia_response = await getAIResponse(input_msg); 

    try {
      // Fazendo a inserção da tarefa no banco de dados
      const result = await db`
        INSERT INTO main (input_msg, output_msg, date_msg) 
        VALUES (${input_msg}, ${ia_response}, NOW()) 
        RETURNING *;
      `;
      
      // Retorna a tarefa inserida com status 201 (Criado, Sucesso)
      return reply.status(201).send(result[0]);
    } catch (error) {
      // Se algo der errado, retornamos um erro 500
      console.error(error);
      return reply.status(500).send({ error: 'Erro ao salvar a tarefa.' });
    }
  });
}
