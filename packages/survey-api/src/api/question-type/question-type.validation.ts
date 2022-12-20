import * as z from 'zod';
import { QuestionTypesArr } from '../../utils/question-types';

export const QuestionTypeInput = z.object({
  type: z.enum(QuestionTypesArr, { required_error: 'Type passed is invalid' }),
});

export const QuestionTypeIdParam = z.object({
  id: z.string({ required_error: 'Question Type Id must be string' }),
});

export type QuestionTypeIdParam = z.infer<typeof QuestionTypeIdParam>;
export type QuestionTypeInput = z.infer<typeof QuestionTypeInput>;
