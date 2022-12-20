import { QType } from '@prisma/client';
import * as z from 'zod';
import { ZodEffects, ZodString } from 'zod';

export const QuestionTypes = {
  [QType.TEXT]: QType.TEXT,
  [QType.TEXT_EMAIL]: QType.TEXT_EMAIL,
  [QType.TEXT_URL]: QType.TEXT_URL,
  [QType.TEXT_PASSWORD]: QType.TEXT_PASSWORD,
  [QType.TEXT_DATE]: QType.TEXT_DATE,
  [QType.TEXT_NUMBER]: QType.TEXT_NUMBER,
  [QType.TEXT_TEL]: QType.TEXT_TEL,
  [QType.RADIO]: QType.RADIO,
  [QType.DROPDOWN]: QType.DROPDOWN,
  [QType.CHECKBOX]: QType.CHECKBOX,
  [QType.BOOLEAN]: QType.BOOLEAN,
  [QType.COMMENT]: QType.COMMENT,
};

export const ANSWER_VALIDATION: {
  [key: string]: ZodString | ZodEffects<ZodString>;
} = {
  [QType.TEXT]: z.string({ required_error: 'Passed value is required' }),
  [QType.TEXT_EMAIL]: z.string().email({ message: 'Must pass a valid email' }),
  [QType.TEXT_URL]: z.string().url({ message: 'Must pass a valid URL' }),
  [QType.TEXT_PASSWORD]: z.string().refine(
    (val) => {
      return val !== null && val.length >= 8;
    },
    { message: 'Password must be at least 8 characters long' },
  ),
  [QType.TEXT_DATE]: z.string().refine(
    (val) => {
      return new Date(val) !== null;
    },
    { message: 'Date passed must valid' },
  ),
  [QType.TEXT_NUMBER]: z
    .string()
    .regex(/^\d+$/, { message: 'Paassed value must be a number' }),
  [QType.TEXT_TEL]: z.string({ required_error: 'Passed value is required' }),
  [QType.BOOLEAN]: z
    .string()
    .refine((val) => val.length, { message: 'Value must not be null' }),
  [QType.RADIO]: z.string({ required_error: 'Passed value is required' }),
  [QType.CHECKBOX]: z.string({ required_error: 'Passed value is required' }),
};

const values = Object.values(QuestionTypes);
type Type = typeof values[0];

export const QuestionTypesArr: readonly [Type, ...Type[]] = [
  values[0],
  ...values.slice(1),
];
