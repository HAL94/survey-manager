import * as z from 'zod';

const QuestionOptionValue = z.string({
  required_error: '"Question Option Value" field is required',
});

export const QuestionOptionInput = z.object({
  qid: z.string({ required_error: '"Question Id" field is required' }),
  value: QuestionOptionValue,
});

export const QuestionOptionUpdate = z.object({  
  value: QuestionOptionValue,
});

export const QuestionOptionIdParam = z.object({
  qoid: z.string().regex(/^\d+$/, 'Question Option Id must be Int'),
});

export type QuestionOptionInput = z.infer<typeof QuestionOptionInput>;
export type QuestionOptionIdParam = z.infer<typeof QuestionOptionIdParam>;
export type QuestionOptionUpdate = z.infer<typeof QuestionOptionUpdate>;
