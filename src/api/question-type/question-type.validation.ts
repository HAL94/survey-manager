import * as z from 'zod';

export const QuestionTypeInput = z.object({
  type: z.string({ required_error: '"Type" field is required' }),
});

export const QuestionTypeIdParam =  z.object({
  id: z.string({ required_error: 'Question Type Id must be string' }),
});

export type QuestionTypeIdParam = z.infer<typeof QuestionTypeIdParam>;
export type QuestionTypeInput = z.infer<typeof QuestionTypeInput>;
