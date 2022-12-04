import * as z from 'zod';

export default interface RequestValidator {
  body?: z.AnyZodObject | z.ZodEffects<any> | z.ZodOptional<any>;
  params?: z.AnyZodObject;
  query?: z.AnyZodObject;
}
