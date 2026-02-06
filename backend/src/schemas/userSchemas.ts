import Joi from 'joi';
const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
