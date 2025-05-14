'use server';
/**
 * @fileOverview An AI assistant for querying pet medical history.
 *
 * - medicalHistoryAssistant - A function that allows pet owners to ask questions about their pet's medical history.
 * - MedicalHistoryAssistantInput - The input type for the medicalHistoryAssistant function.
 * - MedicalHistoryAssistantOutput - The return type for the medicalHistoryAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicalHistoryAssistantInputSchema = z.object({
  medicalHistory: z
    .string()
    .describe("The pet's medical history, including diagnoses, treatments, and medications."),
  question: z.string().describe('The question about the pet medical history.'),
});
export type MedicalHistoryAssistantInput = z.infer<
  typeof MedicalHistoryAssistantInputSchema
>;

const MedicalHistoryAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about the medical history.'),
});
export type MedicalHistoryAssistantOutput = z.infer<
  typeof MedicalHistoryAssistantOutputSchema
>;

export async function medicalHistoryAssistant(
  input: MedicalHistoryAssistantInput
): Promise<MedicalHistoryAssistantOutput> {
  return medicalHistoryAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medicalHistoryAssistantPrompt',
  input: {schema: MedicalHistoryAssistantInputSchema},
  output: {schema: MedicalHistoryAssistantOutputSchema},
  prompt: `You are a helpful assistant that answers questions about a pet's medical history.

  Use the following medical history to answer the question.

  Medical History: {{{medicalHistory}}}

  Question: {{{question}}}

  Answer: `,
});

const medicalHistoryAssistantFlow = ai.defineFlow(
  {
    name: 'medicalHistoryAssistantFlow',
    inputSchema: MedicalHistoryAssistantInputSchema,
    outputSchema: MedicalHistoryAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
