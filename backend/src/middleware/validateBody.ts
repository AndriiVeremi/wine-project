import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validateBody =
  (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errors = error.details.map((err) => ({
        field: err.context?.key,
        message: err.message,
      }));
      return res.status(400).json({ message: 'Помилка валідації', errors });
    }
    next();
  };

export default validateBody;
