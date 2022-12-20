/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export default interface RequestValidator {
  body?: z.AnyZodObject | z.ZodEffects<any> | z.ZodOptional<any>;
  params?: z.AnyZodObject | z.ZodEffects<any> | z.ZodOptional<any>;
  query?: z.AnyZodObject;
}
