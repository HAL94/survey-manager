// schema validation lib
import * as z from 'zod';

export const SurveyInput = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const SurveyIdParam = z.object({
  surveyId: z.string().regex(/^\d+$/, 'Survey Id must be int'),
});

export const SurveyIdBody = z.object({
  surveyId: z.number({ required_error: 'Survey Id must be int' }),
});

export type SurveyInput = z.infer<typeof SurveyInput>;
export type SurveyIdParam = z.infer<typeof SurveyIdParam>;
export type SurveyIdBody = z.infer<typeof SurveyIdBody>;
