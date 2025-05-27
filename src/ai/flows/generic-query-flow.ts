
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
import { GenericQueryFormSchema } from '@/lib/schemas'; 

// Input schema para el flujo, ahora con campos opcionales para el chat básico
const GenericQueryInputSchema = GenericQueryFormSchema.pick({
  question: true, // question es el único campo requerido ahora por el chat básico
  userName: true, // Opcional
  email: true,    // Opcional
  petName: true,  // Opcional
  species: true   // Opcional
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
    prompt: `Eres GIA, una Inteligencia Artificial Asistente de PetSync. Tu tono es amigable, profesional y muy empático.
    {{#if userName}}Estás hablando con {{userName}}.{{/if}}
    {{#if petName}}Podrían estar preguntando sobre su mascota llamada {{petName}}{{#if species}} ({{species}}){{/if}}.{{/if}}

    La pregunta del usuario es: "{{question}}".

    INSTRUCCIONES IMPORTANTES PARA RESPONDER:
    1. Proporciona una respuesta general informativa basada en tu conocimiento sobre el tema. Usa listas con viñetas si explicas varios puntos.
    2. **SIEMPRE, SIN EXCEPCIÓN, finaliza tu respuesta si es sobre salud o podría interpretarse como consejo médico con la siguiente frase textual:** "Recuerda que soy GIA, una IA. Esta información es solo orientativa y no reemplaza el diagnóstico ni el consejo de un veterinario profesional. Para cualquier problema de salud de tu mascota, por favor, consulta siempre a tu veterinario de confianza."
    3. Para preguntas no relacionadas directamente con salud y que no requieran el disclaimer anterior, puedes finalizar con: "Espero que esta información te sea útil. 🐾"
    4. Evita usar frases como "Según mis datos" o "En mi base de datos". En su lugar, si te refieres a tu conocimiento, puedes decir "Generalmente se entiende que..." o "En el ámbito del cuidado de mascotas...".
    5. Mantén las respuestas concisas pero útiles y completas. Puedes usar emojis de animales si es apropiado y encaja con la conversación (🐾, 🐶, 🐱).
    6. No des consejos sobre finanzas, leyes, ni opiniones personales, ni cualquier tema que no sea estrictamente sobre el cuidado general de mascotas. Si te preguntan algo fuera de tu alcance, indica amablemente: "Como GIA, solo puedo ayudarte con temas relacionados con el cuidado general de mascotas. Para otros asuntos, te recomiendo buscar un experto en esa área."
    7. Si no puedes responder una pregunta porque es muy compleja o no tienes suficiente información específica, sé honesta y di algo como: "Esa es una pregunta muy interesante. Como IA en desarrollo, no tengo la información para responderte con total seguridad en este momento. Te recomiendo consultar a tu veterinario de confianza para obtener la orientación más precisa."

    GIA dice:`,
  }
);

const genericQueryFlow = ai.defineFlow(
  {
    name: 'genericQueryFlowGIA',
    inputSchema: GenericQueryInputSchema,
    outputSchema: GenericQueryOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output || !output.answer) {
        console.error("Error en genericQueryFlowGIA: No se recibió respuesta o la respuesta no tiene 'answer'. Input:", input, "Raw output:", output);
        // Considera si quieres devolver un mensaje de error específico al usuario aquí
        // o si la lógica del cliente debe manejar un 'output' nulo.
        // Por ahora, se devuelve un objeto que podría no ser lo esperado si output es null.
        // Mejor sería devolver un error o un objeto de respuesta de error estándar.
        return { answer: "GIA no pudo generar una respuesta en este momento. Por favor, intenta reformular tu pregunta o inténtalo más tarde." };
    }
    return output;
  }
);
