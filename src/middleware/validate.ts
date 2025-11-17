import type { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema<any>, part: 'body'|'query'|'params' = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse((req as any)[part]);
    if (!result.success) {
      return res.status(422).json({ message: 'Validation error', issues: result.error.format() });
    }
    (req as any)[part] = result.data;
    next();
  };
}
