// src/ai/flows/estimate-admission-chance.ts
'use server';

/**
 * @fileOverview Estimates the admission chance to a specific university based on a student's grades.
 *
 * - estimateAdmissionChance - A function that estimates the admission chance.
 * - EstimateAdmissionChanceInput - The input type for the estimateAdmissionChance function.
 * - EstimateAdmissionChanceOutput - The return type for the estimateAdmissionChance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateAdmissionChanceInputSchema = z.object({
  universityName: z.string().describe('The name of the university to estimate admission chance for.'),
  programName: z.string().describe('The name of the program to estimate admission chance for.'),
  grade11Results: z
    .string()
    .describe(
      'The student grade 11 results. Please list all courses and grades (e.g., Math: 95, English: 88, Science: 92)'
    ),
  grade12FirstTermResults: z
    .string()
    .describe(
      'The student grade 12 first term results. Please list all courses and grades (e.g., Math: 90, English: 85, Science: 91)'
    ),
  grade12SecondTermResults: z
    .string()
    .describe(
      'The student grade 12 second term results. Please list all courses and grades (e.g., Math: 92, English: 87, Science: 93). If not available, indicate as N/A.'
    ),
});
export type EstimateAdmissionChanceInput = z.infer<
  typeof EstimateAdmissionChanceInputSchema
>;

const EstimateAdmissionChanceOutputSchema = z.object({
  chancePercentage: z
    .number()
    .describe(
      'The estimated chance of admission to the university, expressed as a percentage (0-100).'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the estimated chance, including factors considered and their impact.'
    ),
});
export type EstimateAdmissionChanceOutput = z.infer<
  typeof EstimateAdmissionChanceOutputSchema
>;

export async function estimateAdmissionChance(
  input: EstimateAdmissionChanceInput
): Promise<EstimateAdmissionChanceOutput> {
  return estimateAdmissionChanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateAdmissionChancePrompt',
  input: {schema: EstimateAdmissionChanceInputSchema},
  output: {schema: EstimateAdmissionChanceOutputSchema},
  prompt: `You are an AI admission chance estimator for universities.

You will receive the student's grades for Grade 11, Grade 12 (first term), and Grade 12 (second term, if available), along with the name of the university and program they are applying to. You must output an estimated chance of admission as a percentage (0-100), followed by a detailed reasoning explaining your estimation.

University: {{{universityName}}}
Program: {{{programName}}}
Grade 11 Results: {{{grade11Results}}}
Grade 12 First Term Results: {{{grade12FirstTermResults}}}
Grade 12 Second Term Results: {{{grade12SecondTermResults}}}

Estimate:
`,
});

const estimateAdmissionChanceFlow = ai.defineFlow(
  {
    name: 'estimateAdmissionChanceFlow',
    inputSchema: EstimateAdmissionChanceInputSchema,
    outputSchema: EstimateAdmissionChanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
