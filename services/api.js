import { db } from '../db/index.js';
import { taskRoutes } from '../routes/taskroutes.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; 

dotenv.config(); 

const API_KEY = process.env.AI_API_KEY;

export async function getAIResponse(input_msg) {

  const prompt = `Analise a tarefa a seguir e responda com a forma mais **eficiente, simples, rápida e prática** de executá-la.

                  Objetivo:
                  - Eliminar complexidade

                  IMPORTANTE:
                  Sua resposta deve:
                  - Estar **100% em português do Brasil**
                  - Atender a tarefa do usuário que é {{input_msg}}
                  - Ter no máximo **200 palavras**
                  - Ser **clara, direta, objetiva**
                  - Utilizar bullets para destacar passos ou opções, se útil
                  - Incluir **justificativas práticas** para cada ação recomendada
                  - Evitar frases genéricas ou explicações longas
                  - Comparar abordagens e recomendar **a melhor**, se houver mais de uma forma de fazer

                  **Importante:**  
                  - **Não use introduções, saudações ou explicações antes da resposta.**
                  - Vá direto ao ponto.`;
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", 
        "X-Title": "TaskS"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", 
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: input_msg }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (err) {
    console.error("Erro ao chamar a IA:", err);
    return "Erro ao chamar a IA.";
  }
}
