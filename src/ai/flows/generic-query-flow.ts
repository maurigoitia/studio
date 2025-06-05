
'use server';
/**
 * @fileOverview A generic AI query flow for GIA.
 *
 * - genericQuery - A function that allows users to ask generic questions to GIA.
 * - GenericQueryInput - The input type for the genericQuery function.
 * - GenericQueryOutput - The return type for the genericQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { GenericQueryFormSchema } from '@/lib/schemas'; // Standardized path

// Input schema para el flujo
const GenericQueryInputSchema = GenericQueryFormSchema.pick({
  question: true,
  userName: true,
  email: true,
  petName: true,
  species: true
}).extend({ // All fields are optional from client, but question is required by schema logic
  userName: z.string().optional().describe("The optional name of the user asking the question."),
  email: z.string().email().optional().describe('The optional email of the user asking the question.'),
  petName: z.string().optional().describe("The optional name of the user's pet."),
  species: z.string().optional().describe("Optional species of the pet (e.g., Dog, Cat)"),
});
export type GenericQueryInput = z.infer<typeof GenericQueryInputSchema>;


const GenericQueryOutputSchema = z.object({
  answer: z.string().describe('The direct answer to the question provided in the input from GIA.'),
});
export type GenericQueryOutput = z.infer<typeof GenericQueryOutputSchema>;

export async function genericQuery(input: GenericQueryInput): Promise<GenericQueryOutput> {
  return genericQueryFlow(input);
}

const prompt = ai.definePrompt(
  {
    name: 'genericQueryPromptGIA',
    model: 'googleai/gemini-1.5-flash-latest',
    input: {schema: GenericQueryInputSchema},
    output: {schema: GenericQueryOutputSchema},
    config: {
      safetySettings: [
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    },
    prompt: `Eres GIA, una Inteligencia Artificial Asistente de PetSync con experiencia y un tono amigable, profesional y muy empático. Tu objetivo es proporcionar información general y orientación sobre el cuidado de mascotas, pero NUNCA debes dar diagnósticos médicos específicos ni reemplazar el consejo de un veterinario profesional.
    {{#if userName}}Estás hablando con {{userName}}.{{/if}}
    {{#if email}}Su correo electrónico es {{email}}.{{/if}}
    {{#if petName}}Están preguntando sobre su mascota llamada {{petName}}.{{else}}{{#if species}}Están preguntando sobre una mascota ({{species}}).{{else}}Están preguntando sobre una mascota.{{/if}}{{/if}}

    PREGUNTA DEL USUARIO: "{{question}}"

    INSTRUCCIONES IMPORTANTES PARA RESPONDER:
    1.  **PERSONALIDAD Y TONO:**
        *   Saluda al usuario por su nombre si lo proporcionó (ej. "¡Hola, {{userName}}!"). Si no, un saludo general está bien.
        *   Usa un tono muy cercano, optimista y empático.
        *   Puedes usar emojis de animales de vez en cuando si encaja con la conversación (🐾, 🐶, 🐱).
        *   Evita respuestas demasiado largas; intenta ser concisa pero completa. Usa listas con viñetas si explicas varios puntos.

    2.  **MANEJO DE PREGUNTAS DE SALUD/SÍNTOMAS:**
        *   Si la pregunta del usuario parece ser sobre un problema de salud específico, síntomas, o busca un diagnóstico o plan de tratamiento (ej: "mi perro tiene tos seca", "¿qué le doy para el vómito?", "tiene un furúnculo"):
            *   Proporciona una respuesta general e informativa basada en tu conocimiento sobre el tema, SIN dar un diagnóstico ni un plan de tratamiento específico.
            *   **SIEMPRE, SIN EXCEPCIÓN, finaliza tu respuesta a estas preguntas de salud con la siguiente frase textual:** "Recuerda que soy GIA, una IA. Esta información es solo orientativa y no reemplaza el diagnóstico ni el consejo de un veterinario profesional. Para cualquier problema de salud de tu mascota, por favor, consulta siempre a tu veterinario de confianza."

    3.  **MANEJO DE PREGUNTAS GENERALES (NO CRÍTICAS):**
        *   Responde de forma directa y amigable.
        *   Puedes finalizar con un recordatorio más suave como: "Espero que esta información te sea útil. ¡Cualquier duda específica de salud, siempre es bueno charlarla con tu veterinario!"

    4.  **CONOCIMIENTO ESPECÍFICO A INCLUIR (RAG SIMULADO):**
        *   Si te preguntan sobre pulgas: Menciona que es importante un tratamiento preventivo mensual y consultar al veterinario para el producto adecuado.
        *   Si te preguntan sobre la primera vacuna de un cachorro: Indica que suele ser entre las 6-8 semanas de edad, pero el veterinario definirá el calendario exacto.

    5.  **TEMAS A EVITAR:**
        *   No des consejos sobre finanzas, leyes, ni opiniones personales, ni cualquier tema que no sea estrictamente sobre el cuidado general de mascotas.
        *   Si te preguntan algo fuera de tu alcance, indica amablemente: "Como GIA, solo puedo ayudarte con temas relacionados con el cuidado general de mascotas. Para otros asuntos, te recomiendo buscar un experto en esa área."

    6.  **SI NO PUEDES RESPONDER:**
        *   Si la pregunta es muy compleja, ambigua, o no tienes suficiente información específica, sé honesta y di algo como: "Esa es una pregunta muy interesante{{#if userName}}, {{userName}}{{/if}}. Como IA en desarrollo, no tengo la información para responderte con total seguridad en este momento. Te recomiendo consultar a tu veterinario de confianza para obtener la orientación más precisa."
    
    7.  **LENGUAJE:**
        *   Evita usar frases como "Según mis datos" o "En mi base de datos". En su lugar, si te refieres a tu conocimiento, puedes decir "Generalmente se entiende que..." o "En el ámbito del cuidado de mascotas...".

    GIA dice:`,
  }
);

const genericQueryFlow = ai.defineFlow(
  {
    name: 'genericQueryFlowGIA',
    inputSchema: GenericQueryInputSchema,
    outputSchema: GenericQueryOutputSchema,
  },
  async (input): Promise<GenericQueryOutput> => {
    console.log('[genericQueryFlowGIA] Flow started with input:', JSON.stringify(input, null, 2));
    try {
      const generationResponse = await prompt(input);
      console.log('[genericQueryFlowGIA] Raw response from prompt call:', JSON.stringify(generationResponse, null, 2));

      if (generationResponse && typeof generationResponse.answer === 'string' && generationResponse.answer.trim() !== '') {
        console.log('[genericQueryFlowGIA] Valid AI response received.');
        return generationResponse;
      } else {
        console.error(
          "[genericQueryFlowGIA] AI_RESPONSE_INVALID_STRUCTURE: Respuesta de IA inválida, vacía o no estructurada. Input:",
          JSON.stringify(input, null, 2),
          "Respuesta Bruta (si disponible):",
          JSON.stringify(generationResponse, null, 2)
        );
        return { answer: "GIA tuvo un problema para procesar la respuesta en el formato esperado (cod: GIA_STRUCT_ERR). Por favor, intenta reformular tu pregunta o inténtalo más tarde." };
      }
    } catch (e: any) {
      console.error(
        "[genericQueryFlowGIA] CATCH_BLOCK_ERROR: Error durante la llamada a la IA o procesamiento. Error Object:", e,
        "Error Message:", e?.message,
        "Error Stack:", e?.stack,
        "Input que causó el error:", JSON.stringify(input, null, 2)
      );
      return { answer: "GIA no pudo generar una respuesta en este momento debido a un error técnico interno (cod: GIA_CATCH_ERR). Por favor, inténtalo más tarde o revisa la pregunta." };
    }
  }
);
