import * as z from 'zod';

export const QuestionInput = z.object({
  surveyId: z.number(),
  isRequired: z.boolean({ required_error: '"isRequired" field is required' }),
  title: z.string({ required_error: '"title" field is required' }),
  type: z.string({ required_error: '"type" field is required' }),
});

export const QuestionIdParam = z.object({
  qid: z.string({ required_error: 'Question Id (qid) is either missing or not a string' }),
});

export type QuestionInput = z.infer<typeof QuestionInput>;
export type QuestionIdParam = z.infer<typeof QuestionIdParam>;
