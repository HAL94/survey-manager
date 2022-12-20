import * as z from 'zod';

const QuestionAnswerValue = z.string({
  required_error: '"Question Answer Value" field is required',
});

export const QuestionAnswerInput = z.object({
  qid: z.string({ required_error: '"Question Id" field is required' }),
  qoid: z.number({ required_error: '"Question Option Id" field is required' }),
  answer: QuestionAnswerValue,
});

export const QuestionAnswerInputMulti = z.object({
  input: z.array(QuestionAnswerInput),
});

export const QuestionAnswerUpdate = z.object({
  answer: QuestionAnswerValue,
});

export const QuestionAnswerIdParam = z.object({
  qaid: z.string().regex(/^\d+$/, 'Question Answer Id must be Int'),
});

export type QuestionAnswerInput = z.infer<typeof QuestionAnswerInput>;
export type QuestionAnswerInputMulti = z.infer<typeof QuestionAnswerInputMulti>;
export type QuestionAnswerIdParam = z.infer<typeof QuestionAnswerIdParam>;
export type QuestionAnswerUpdate = z.infer<typeof QuestionAnswerUpdate>;
