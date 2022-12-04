// schema validation lib
import { QuestionType } from '@prisma/client';
import * as z from 'zod';

const questionSchemaRefineChoicesRequired = (schema: any) => {
  if (schema.type === QuestionType.RADIOGROUP) {
    return !!schema.choices;
  }
  return true;
};

const questionSchemaRefineChoicesLength = (schema: any) => {
  if (schema.type === QuestionType.RADIOGROUP) {
    return schema.choices && schema.choices.length >= 4;
  }
  return true;
};

export const ParamsWithIntId = z.object({
  id: z.string().regex(/^\d+$/, 'Survey Id must be int').transform(Number),
});

export const QuestionParamsSchema = ParamsWithIntId.merge(
  z.object({
    qid: z.string(),
  }),
);


export const QuestionBodyAddSchema = z
  .object({
    isRequired: z.boolean({ required_error: '"isRequired" field is required' }),
    title: z.string({ required_error: '"title" field is required' }),
    type: z.enum(['COMMENTQUESTION', 'RADIOGROUP'], {
      required_error: '"type" field is required',
    }),
    choices: z.array(z.string()).optional(),
  })
  .refine(questionSchemaRefineChoicesLength, {
    message:
      'If question type is RADIOGROUP, then field "choices" must have at least 4 items',
  })
  .refine(questionSchemaRefineChoicesRequired, {
    message:
      'If question type is RADIOGROUP, then field "choices" must be passed',
  });

  
export const SurveySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  questions: z.array(QuestionBodyAddSchema).optional(),
});

export const QuestionBodyUpdateSchema = QuestionBodyAddSchema.optional();

export type ParamsWithId = z.infer<typeof ParamsWithIntId>;
export type QuestionParamsInput = z.infer<typeof QuestionParamsSchema>; //{ id: string; qid: string };
export type SurveyAddBody = z.infer<typeof SurveySchema>;
export type QuestionAddBody = z.infer<typeof QuestionBodyAddSchema>;
export type QuestionUpdateBody = z.infer<typeof QuestionBodyUpdateSchema>;
