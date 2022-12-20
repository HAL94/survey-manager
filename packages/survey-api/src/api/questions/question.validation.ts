import * as z from 'zod';
import { SurveyIdBody } from '../surveys/survey.validation';

export const QuestionInput = z.object({
  surveyId: z.number(),
  isRequired: z.boolean({ required_error: '"isRequired" field is required' }),
  title: z.string({ required_error: '"title" field is required' }),
  type: z.string({ required_error: '"type" field is required' }),
});

export const QuestionIdParam = z.object({
  qid: z.string({
    required_error: 'Question Id (qid) is either missing or not a string',
  }),
});

export const QuestionIncludeOptsFlag = z.object({
  includeOpts: z.boolean().optional(),
});

export const GetAllQuestionsBody = SurveyIdBody.merge(QuestionIncludeOptsFlag);

export type QuestionInput = z.infer<typeof QuestionInput>;
export type QuestionIdParam = z.infer<typeof QuestionIdParam>;
export type QuestionIncludeOptsFlag = z.infer<typeof QuestionIncludeOptsFlag>;
export type GetAllQuestionsBody = z.infer<typeof GetAllQuestionsBody>;
