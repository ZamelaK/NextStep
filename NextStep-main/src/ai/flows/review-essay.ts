
'use server';
/**
 * @fileOverview Provides AI-powered feedback on application essays.
 *
 * - reviewEssay - A function that analyzes an essay and provides feedback.
 * - ReviewEssayInput - The input type for the reviewEssay function.
 * - ReviewEssayOutput - The return type for the reviewEssay function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReviewEssayInputSchema = z.object({
  essay: z.string().describe('The full text of the application essay or motivation letter.'),
});
export type ReviewEssayInput = z.infer<typeof ReviewEssayInputSchema>;

const ReviewEssayOutputSchema = z.object({
  overallScore: z.number().min(0).max(100).describe('An overall score for the essay from 0 to 100.'),
  summary: z.string().describe('A brief one-paragraph summary of the feedback.'),
  overallFeedback: z.object({
      clarity: z.number().describe('A score from 0-100 for clarity and conciseness.'),
      grammar: z.number().describe('A score from 0-100 for grammatical correctness.'),
      tone: z.string().describe('A description of the essay\'s tone (e.g., "Professional," "Persuasive," "Too casual").'),
  }),
  suggestions: z.array(z.object({
      originalText: z.string().describe('The specific sentence or phrase from the original essay that could be improved.'),
      suggestion: z.string().describe('The suggested improvement or alternative wording.'),
  })).describe('A list of specific suggestions for improvement.'),
});
export type ReviewEssayOutput = z.infer<typeof ReviewEssayOutputSchema>;


export async function reviewEssay(
  input: ReviewEssayInput
): Promise<ReviewEssayOutput> {
  return reviewEssayFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reviewEssayPrompt',
  input: {schema: ReviewEssayInputSchema},
  output: {schema: ReviewEssayOutputSchema},
  prompt: `You are an expert university admissions counselor and writing coach. Your task is to provide constructive feedback on a student's application essay.

Analyze the following essay for clarity, grammar, and tone. Provide an overall score out of 100. Then, give a brief summary of your feedback. Finally, provide specific, actionable suggestions for improvement, highlighting the original text and your proposed change.

The tone should be encouraging but professional. The goal is to help the student improve their essay, not to discourage them.

Essay to review:
---
{{{essay}}}
---

Please provide your feedback in the structured format required.`,
});

const reviewEssayFlow = ai.defineFlow(
  {
    name: 'reviewEssayFlow',
    inputSchema: ReviewEssayInputSchema,
    outputSchema: ReviewEssayOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
