'use server';
/**
 * @fileOverview A generic AI query flow.
 *
 * - genericQuery - A function that allows users to ask generic questions to an AI model.
 * - GenericQueryInput - The input type for the genericQuery function.
 * - GenericQueryOutput - The return type for the genericQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenericQueryInputSchema = z.object({
  question: z.string().describe('The question to ask the AI model.'),
});
export type GenericQueryInput = z.infer<typeof GenericQueryInputSchema>;

const GenericQueryOutputSchema = z.object({
  answer: z.string().describe('The direct answer to the question provided in the input.'),
});
export type GenericQueryOutput = z.infer<typeof GenericQueryOutputSchema>;

export async function genericQuery(input: GenericQueryInput): Promise<GenericQueryOutput> {
  return genericQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'genericQueryPrompt',
  input: {schema: GenericQueryInputSchema},
  output: {schema: GenericQueryOutputSchema},
  prompt: `Answer the following question comprehensively:
Question: {{{question}}}

Answer:`,
});

const genericQueryFlow = ai.defineFlow(
  {
    name: 'genericQueryFlow',
    inputSchema: GenericQueryInputSchema,
    outputSchema: GenericQueryOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("No output received from AI model");
    }
    return output;
  }
);
