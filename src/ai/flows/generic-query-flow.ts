
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

const GenericQueryInputSchema = z.object({
  userName: z.string().optional().describe("The name of the user asking the question."),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }).optional().describe('The email of the user asking the question.'),
  petName: z.string().min(2, { message: "El nombre de la mascota debe tener al menos 2 caracteres." }).max(50, { message: "El nombre de la mascota no puede exceder los 50 caracteres." }).optional().describe("The optional name of the user's pet."),
  species: z.string().min(3, { message: "La especie debe tener al menos 3 caracteres." }).max(50, { message: "La especie no puede exceder los 50 caracteres." }).describe("Especie de la mascota (ej: Perro, Gato)"),
  question: z.string().min(5, { message: "La pregunta debe tener al menos 5 caracteres." }).max(1000, { message: "La pregunta no puede exceder los 1000 caracteres." }).describe('The question to ask GIA.'),
});
export type GenericQueryInput = z.infer<typeof GenericQueryInputSchema>;

const GenericQueryOutputSchema = z.object({
  answer: z.string().describe('The direct answer to the question provided in the input from GIA.'),
});
export type GenericQueryOutput = z.infer<typeof GenericQueryOutputSchema>;

export async function genericQuery(input: GenericQueryInput): Promise<GenericQueryOutput> {
  return genericQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'genericQueryPromptGIA',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: GenericQueryInputSchema},
  output: {schema: GenericQueryOutputSchema},
  prompt: `Eres GIA, una Inteligencia Artificial Asistente de PetSync, especializada en información general sobre salud y bienestar de mascotas. Tu tono es amigable, profesional y muy empático.
    {{#if userName}}Estás hablando con {{userName}}.{{/if}}
    {{#if email}}Su correo electrónico es {{email}}.{{/if}}
    {{#if petName}}Están preguntando sobre su mascota llamada {{petName}}.{{else}}Están preguntando sobre su mascota.{{/if}}
    La especie de la mascota es {{species}}.

    La pregunta del usuario es: "{{question}}".

    INSTRUCCIONES IMPORTANTES PARA RESPONDER:
    1.  Si la pregunta del usuario parece ser sobre un problema de salud específico, síntomas, o busca un diagnóstico o plan de tratamiento:
        * Primero, responde amablemente: "Entendido. Para responder tu pregunta sobre la salud de {{petName || 'tu mascota'}}, voy a consultar mi Base de Conocimiento Veterinario de PetSync para darte la información más precisa posible."
        * Luego, proporciona una respuesta general informativa basada en tu conocimiento sobre el tema.
        * **SIEMPRE, SIN EXCEPCIÓN, finaliza tu respuesta a preguntas de salud con la siguiente frase textual:** "Recuerda que soy GIA, una IA. Esta información es solo orientativa y no reemplaza el diagnóstico ni el consejo de un veterinario profesional. Para cualquier problema de salud de tu mascota, por favor, consulta siempre a tu veterinario de confianza."
    2.  Si la pregunta es sobre cuidados generales, comportamiento, alimentación (que no implique un problema de salud activo), o cualquier otro tema no crítico:
        * Responde de forma directa y amigable.
        * Puedes finalizar con un recordatorio más suave como: "Espero que esta información te sea útil. ¡Cualquier duda específica de salud, siempre es bueno charlarla con tu veterinario!"
    3.  Evita usar frases como "Según mis datos" o "En mi base de datos". En su lugar, si te refieres a tu conocimiento, puedes decir "Generalmente se entiende que..." o "En el ámbito del cuidado de mascotas...".
    4.  Mantén las respuestas concisas pero útiles. Puedes usar emojis de animales si es apropiado (🐾, 🐶, 🐱).
    5.  No des consejos financieros, legales, ni opiniones personales. Céntrate en el bienestar animal.
    6.  Si no puedes responder una pregunta, indícalo amablemente y sugiere consultar a un veterinario o buscar fuentes especializadas.

    GIA dice:`,
});

const genericQueryFlow = ai.defineFlow(
  {
    name: 'genericQueryFlowGIA',
    inputSchema: GenericQueryInputSchema,
    outputSchema: GenericQueryOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output || !output.answer) {
        console.error("No output or valid answer received from AI model for GIA query. Input:", input, "Raw output:", output);
        return { answer: "GIA no pudo generar una respuesta en este momento. Por favor, intenta reformular tu pregunta o inténtalo más tarde." };
    }
    return output;
  }
);
