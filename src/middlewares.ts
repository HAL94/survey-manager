import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import OperationResponse from './interfaces/operation-response.interface';

// import OperationResponse from './interfaces/OperationResponse';
import RequestValidator from './interfaces/request-validator.interface';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validateRequest(validators: RequestValidator) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.params) {
        const params = await validators.params.parseAsync(req.params);
        console.log('params', params);
        req.params = params;
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }
      next();
    } catch (error: any) {
      let message = 'Your request is invalid';
      console.log('error.message', error?.message);
      if (error instanceof ZodError) {
        res.status(422);
        const parsedMsg = JSON.parse(error.message);
        if (parsedMsg instanceof SyntaxError === false) {
          message = parsedMsg.map((item: any) => item.message).join('. ') || message;
        } else {
          message = error.message || message;
        }
      }
      next(new Error(message));
    }
  };
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<OperationResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  console.error('@middleware', err.stack);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    success: false,
    result: null,
  });
}
