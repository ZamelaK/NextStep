// src/ai/flows/suggest-universities.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting universities or programs
 *  to students based on their profile.
 *
 * - suggestUniversities - A function that suggests universities based on the student's profile and preferences.
 * - SuggestUniversitiesInput - The input type for the suggestUniversities function.
 * - SuggestUniversitiesOutput - The output type for the suggestUniversities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestUniversitiesInputSchema = z.object({
  grades11: z.record(z.string(), z.string()).describe('Grade 11 results, as a map of course name to grade.'),
  grades12FirstTerm: z.record(z.string(), z.string()).describe('Grade 12 first term results, as a map of course name to grade.'),
  grades12SecondTerm: z.record(z.string(), z.string()).describe('Grade 12 second term results, as a map of course name to grade.'),
  preferredLocation: z.string().describe('The preferred location for the university.'),
  preferredPrograms: z.array(z.string()).describe('The preferred programs of study.'),
  initialUniversityChoices: z.array(z.string()).optional().describe('The initial university choices of the student, if any.'),
});
export type SuggestUniversitiesInput = z.infer<typeof SuggestUniversitiesInputSchema>;

const SuggestUniversitiesOutputSchema = z.object({
  suggestedUniversities: z.array(z.object({
    universityName: z.string().describe('The name of the suggested university.'),
    program: z.string().describe('The suggested program at the university.'),
    reason: z.string().describe('The reason why this university/program is a good suggestion.'),
  })).describe('A list of suggested universities and programs.'),
});
export type SuggestUniversitiesOutput = z.infer<typeof SuggestUniversitiesOutputSchema>;

export async function suggestUniversities(
  input: SuggestUniversitiesInput
): Promise<SuggestUniversitiesOutput> {
  return suggestUniversitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestUniversitiesPrompt',
  input: {schema: SuggestUniversitiesInputSchema},
  output: {schema: SuggestUniversitiesOutputSchema},
  prompt: `You are an expert academic advisor. A student has the following profile:

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
Preferred Programs: {{#each preferredPrograms}}{{{this}}}, {{/each}}
{{#if initialUniversityChoices}}
Initial University Choices: {{#each initialUniversityChoices}}{{{this}}}, {{/each}}
{{/if}}

Based on the student's qualifications and preferences, suggest suitable universities and programs. 
If initial choices are provided and seem like a poor match, suggest better alternatives. Otherwise, provide general suggestions.
Provide a reason for each suggestion.
Ensure that the options are within the student's preferred location, if possible.
Ensure that the response is valid JSON.`,
});

const suggestUniversitiesFlow = ai.defineFlow(
  {
    name: 'suggestUniversitiesFlow',
    inputSchema: SuggestUniversitiesInputSchema,
    outputSchema: SuggestUniversitiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
