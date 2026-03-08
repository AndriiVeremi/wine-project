import Joi from 'joi';
const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('USER', 'WINERY_OWNER').default('USER'),
});

export const addFavoriteSchema = Joi.object({
  wineId: Joi.string().required(),
});

export const updateProfileSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.string().allow('', null),
  birthDate: Joi.date().iso().allow('', null),
  address: Joi.string().allow('', null),
});
