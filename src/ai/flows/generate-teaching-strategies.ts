'use server';

/**
 * @fileOverview AI flow for generating personalized teaching strategies based on student performance data.
 *
 * - generateTeachingStrategies - A function that generates teaching strategies.
 * - GenerateTeachingStrategiesInput - The input type for the generateTeachingStrategies function.
 * - GenerateTeachingStrategiesOutput - The return type for the generateTeachingStrategies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTeachingStrategiesInputSchema = z.object({
  classPerformanceData: z
    .string()
    .describe(
      'A string containing student performance data, including subject marks, attendance, and other relevant metrics.'
    ),
  subject: z.string().describe('The subject for which teaching strategies are needed.'),
  gradeLevel: z.string().describe('The grade level of the class.'),
});
export type GenerateTeachingStrategiesInput = z.infer<
  typeof GenerateTeachingStrategiesInputSchema
>;

const GenerateTeachingStrategiesOutputSchema = z.object({
  teachingStrategies: z
    .string()
    .describe(
      'A list of personalized teaching strategies to improve overall class performance.'
    ),
});
export type GenerateTeachingStrategiesOutput = z.infer<
  typeof GenerateTeachingStrategiesOutputSchema
>;

export async function generateTeachingStrategies(
  input: GenerateTeachingStrategiesInput
): Promise<GenerateTeachingStrategiesOutput> {
  return generateTeachingStrategiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTeachingStrategiesPrompt',
  input: {schema: GenerateTeachingStrategiesInputSchema},
  output: {schema: GenerateTeachingStrategiesOutputSchema},
  prompt: `You are an AI assistant designed to analyze student performance data and suggest personalized teaching strategies.

  Analyze the following student performance data for {{subject}} in grade {{gradeLevel}}:
  \"{{classPerformanceData}}\"

  Based on this data, provide a detailed list of teaching strategies that can be implemented to improve overall class performance.
  Consider various factors such as student engagement, understanding of concepts, and areas where students are struggling.
  The teaching strategies should be specific, actionable, and tailored to the unique needs of the students.
  Format the strategies as a numbered list.
  `,
});

const generateTeachingStrategiesFlow = ai.defineFlow(
  {
    name: 'generateTeachingStrategiesFlow',
    inputSchema: GenerateTeachingStrategiesInputSchema,
    outputSchema: GenerateTeachingStrategiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
