import { db } from '../db/index.js';
import { taskRoutes } from '../routes/taskroutes.js';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const basePrompt = `Você é um assistente extremamente inteligente e objetivo, com foco em produtividade pessoal e execução de tarefas. 
                    Sua função é analisar qualquer tarefa recebida do usuário e sugerir **a forma mais eficiente, 
                    simples, rápida e prática de realizá-la**.
                    Considere as abordagens mais modernas, dicas de especialistas, ferramentas digitais, 
                    métodos de produtividade e até estratégias minimalistas. Seu objetivo é **reduzir o esforço**, **economizar tempo** 
                    e **eliminar complexidade desnecessária**, entregando **um passo a passo direto ao ponto**, com justificativas claras.
                    IMPORTANTE:
                    - A resposta deve ser **clara**, **concisa**, **estrategicamente pensada**.
                    - Evite frases genéricas. Seja prático, específico e focado em resultado.
                    - Use bullets se necessário, para destacar passos ou alternativas.
                    - Sempre leve em consideração que o usuário quer economizar tempo, energia e recursos.
                    - Considere se a tarefa pode ser **automatizada, delegada ou evitada**.
                    - Se existirem várias formas de fazer, **compare e recomende a melhor**.

                    Tarefa do usuário: {{input_msg}}`;

export async function getAIResponse(input_msg) {
  try {

    const filledPrompt = basePrompt.replace('{{input_msg}}', input_msg);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é uma IA que retorna a melhor forma, mais inteligente e mais objetiva possível de uma tarefa que o usuário envia." },
        { role: "user", content: filledPrompt },
      ],
      max_tokens: 50,
      temperature: 0.3,
    });

    return response.choices[0].message.content.trim();

  } catch (error) {
    console.error("Erro ao chamar a API: ", error);
    return "Desculpe, não consegui gerar uma resposta no momento";
  }
}
