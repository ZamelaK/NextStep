// src/ai/flows/suggest-alternative-universities.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting alternative universities or programs
 *  to students who may not qualify for their initial choices.
 *
 * - suggestAlternativeUniversities - A function that suggests alternative universities based on the student's profile and preferences.
 * - SuggestAlternativeUniversitiesInput - The input type for the suggestAlternativeUniversities function.
 * - SuggestAlternativeUniversitiesOutput - The output type for the suggestAlternativeUniversities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlternativeUniversitiesInputSchema = z.object({
  grades11: z.record(z.string(), z.string()).describe('Grade 11 results, as a map of course name to grade.'),
  grades12FirstTerm: z.record(z.string(), z.string()).describe('Grade 12 first term results, as a map of course name to grade.'),
  grades12SecondTerm: z.record(z.string(), z.string()).describe('Grade 12 second term results, as a map of course name to grade.'),
  preferredLocation: z.string().describe('The preferred location for the university.'),
  preferredPrograms: z.array(z.string()).describe('The preferred programs of study.'),
  initialUniversityChoices: z.array(z.string()).describe('The initial university choices of the student.'),
});
export type SuggestAlternativeUniversitiesInput = z.infer<typeof SuggestAlternativeUniversitiesInputSchema>;

const SuggestAlternativeUniversitiesOutputSchema = z.object({
  alternativeUniversities: z.array(z.object({
    universityName: z.string().describe('The name of the alternative university.'),
    program: z.string().describe('The suggested program at the alternative university.'),
    reason: z.string().describe('The reason why this university/program is a good alternative.'),
  })).describe('A list of alternative universities and programs.'),
});
export type SuggestAlternativeUniversitiesOutput = z.infer<typeof SuggestAlternativeUniversitiesOutputSchema>;

export async function suggestAlternativeUniversities(
  input: SuggestAlternativeUniversitiesInput
): Promise<SuggestAlternativeUniversitiesOutput> {
  return suggestAlternativeUniversitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAlternativeUniversitiesPrompt',
  input: {schema: SuggestAlternativeUniversitiesInputSchema},
  output: {schema: SuggestAlternativeUniversitiesOutputSchema},
  prompt: `You are an expert academic advisor. A student with the following profile is not likely to get into their initial university choices:

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
Initial University Choices: {{#each initialUniversityChoices}}{{{this}}}, {{/each}}

Suggest alternative universities that better match the student's qualifications. Provide a reason for each suggestion.
Ensure that the alternative options are within the student's preferred location, if possible.
Ensure that the response is valid JSON.`,
});

const suggestAlternativeUniversitiesFlow = ai.defineFlow(
  {
    name: 'suggestAlternativeUniversitiesFlow',
    inputSchema: SuggestAlternativeUniversitiesInputSchema,
    outputSchema: SuggestAlternativeUniversitiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
