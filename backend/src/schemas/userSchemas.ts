import Joi from 'joi';
const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegexp = /^\+\d{10,14}$/;

export const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('USER', 'WINERY_OWNER').default('USER'),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const addFavoriteSchema = Joi.object({
  wineId: Joi.string().required(),
});

export const updateProfileSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.string().pattern(phoneRegexp).allow('', null),
  birthDate: Joi.date().iso().min('1900-01-01').max('now').allow('', null).messages({
    'date.min': 'Birth date cannot be earlier than 1900',
    'date.max': 'Birth date cannot be in the future',
  }),
  address: Joi.string().allow('', null),
});
