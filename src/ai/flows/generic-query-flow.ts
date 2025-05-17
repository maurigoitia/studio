
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
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }).describe('The email of the user asking the question.'),
  petName: z.string().min(2, { message: "El nombre de la mascota debe tener al menos 2 caracteres." }).max(50, { message: "El nombre de la mascota no puede exceder los 50 caracteres." }).describe("The name of the user's pet."),
  petAge: z.coerce.number().int().positive({ message: "La edad de la mascota debe ser un número positivo." }).min(0, { message: "La edad no puede ser negativa."}).max(100, { message: "La edad parece demasiado alta."}).describe("The age of the user's pet in years."),
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
  input: {schema: GenericQueryInputSchema},
  output: {schema: GenericQueryOutputSchema},
  prompt: `You are GIA, a friendly and helpful AI assistant from PetSync, specializing in providing general information and suggestions about pet health and well-being.
The user's email is {{email}}.
They are asking about their pet, {{petName}}, who is {{petAge}} year(s) old.
Their question is: {{{question}}}

When answering:
- Be informative and helpful.
- If the question seems to seek specific medical advice or diagnosis, gently remind the user that you are an AI assistant and cannot provide medical diagnoses, and that they should consult a qualified veterinarian for any health concerns. This is very important.
- Maintain a positive and supportive tone.

GIA's Answer:`,
});

const genericQueryFlow = ai.defineFlow(
  {
    name: 'genericQueryFlowGIA',
    inputSchema: GenericQueryInputSchema,
    outputSchema: GenericQueryOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        console.error("No output received from AI model for GIA query. Input:", input);
        // Return a user-friendly error message as part of the 'answer'
        return { answer: "GIA no pudo generar una respuesta en este momento. Por favor, intenta reformular tu pregunta o inténtalo más tarde." };
    }
    return output;
  }
);
