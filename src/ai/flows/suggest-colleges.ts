// src/ai/flows/suggest-colleges.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting alternative colleges 
 * to students based on their profile and university admission chance.
 *
 * - suggestColleges - A function that suggests alternative colleges.
 * - SuggestCollegesInput - The input type for the suggestColleges function.
 * - SuggestCollegesOutput - The output type for the suggestColleges function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCollegesInputSchema = z.object({
  grades11: z.record(z.string(), z.string()).describe('Grade 11 results, as a map of course name to grade.'),
  grades12FirstTerm: z.record(z.string(), z.string()).describe('Grade 12 first term results, as a map of course name to grade.'),
  grades12SecondTerm: z.record(z.string(), z.string()).describe('Grade 12 second term results, as a map of course name to grade.'),
  preferredLocation: z.string().describe('The preferred location for the college.'),
  preferredProgram: z.string().describe('The preferred program of study.'),
  admissionChance: z.number().nullable().describe('The estimated admission chance to a university. If the chance is low (e.g., below 40%), colleges should be strongly considered.')
});
export type SuggestCollegesInput = z.infer<typeof SuggestCollegesInputSchema>;

const SuggestCollegesOutputSchema = z.object({
  alternativeColleges: z.array(z.object({
    collegeName: z.string().describe('The name of the alternative college.'),
    program: z.string().describe('The suggested program at the alternative college.'),
    reason: z.string().describe('The reason why this college/program is a good alternative.'),
  })).describe('A list of alternative colleges and programs.'),
});
export type SuggestCollegesOutput = z.infer<typeof SuggestCollegesOutputSchema>;

export async function suggestColleges(
  input: SuggestCollegesInput
): Promise<SuggestCollegesOutput> {
  return suggestCollegesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCollegesPrompt',
  input: {schema: SuggestCollegesInputSchema},
  output: {schema: SuggestCollegesOutputSchema},
  prompt: `You are an expert academic advisor. A student with the following profile may not get into their desired university. 
Their estimated admission chance is {{admissionChance}}%.

Grade 11 Results:
{{#each grades11}}{{{@key}}}: {{this}}
{{/each}}

Grade 12 First Term Results:
{{#each grades12FirstTerm}}{{{@key}}}: {{this}}
{{/each}}

Grade 12 Second Term Results:
{{#each grades12SecondTerm}}{{{@key}}}: {{this}}
{{/each}}

Preferred Location: {{{preferredLocation}}}
Preferred Program: {{{preferredProgram}}}

Suggest suitable colleges and programs that could be a good fit for this student. Consider pathways to university from college. 
Provide a reason for each suggestion.
Ensure that the alternative options are within the student's preferred location, if possible.
Ensure that the response is valid JSON.`,
});

const suggestCollegesFlow = ai.defineFlow(
  {
    name: 'suggestCollegesFlow',
    inputSchema: SuggestCollegesInputSchema,
    outputSchema: SuggestCollegesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
