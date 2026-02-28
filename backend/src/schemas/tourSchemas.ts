import Joi from 'joi';

export const createTourSchema = Joi.object({
  winery: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().allow('', null),
  duration: Joi.number().min(1).optional(),
  price: Joi.number().min(0).optional(),
  images: Joi.array().items(Joi.string()).optional(),

  groupSize: Joi.object({
    min: Joi.number().min(1).required(),
    max: Joi.number().min(1).required(),
  })
    .required()
    .custom((value, helpers) => {
      if (value.max < value.min) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .messages({
      'any.invalid': 'groupSize.max must be greater than or equal to groupSize.min',
    }),
});

export const updateTourSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().allow('', null).optional(),
  duration: Joi.number().min(1).optional(),
  price: Joi.number().min(0).optional(),
  images: Joi.array().items(Joi.string()).optional(),
  groupSize: Joi.object({
    min: Joi.number().min(1).required(),
    max: Joi.number().min(1).required(),
  })
    .custom((value, helpers) => {
      if (value.max < value.min) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .messages({
      'any.invalid': 'groupSize.max must be greater than or equal to groupSize.min',
    }),
}).min(1);
