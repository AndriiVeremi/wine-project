import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validateParams =
  (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);

    if (error) {
      const errors = error.details.map((err) => ({
        field: err.context?.key,
        message: err.message,
      }));
      return res.status(400).json({ message: 'Validation error', errors });
    }
    next();
  };

export default validateParams;
