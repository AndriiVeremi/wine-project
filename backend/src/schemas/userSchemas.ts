import Joi from 'joi';

// Схема для реєстрації користувача
export const registerSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    'string.empty': 'Ім\'я є обов\'язковим',
    'any.required': 'Ім\'я є обов\'язковим',
  }),
  lastName: Joi.string().trim().required().messages({
    'string.empty': 'Прізвище є обов\'язковим',
    'any.required': 'Прізвище є обов\'язковим',
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email є обов\'язковим',
    'string.email': 'Будь ласка, введіть дійсну адресу електронної пошти',
    'any.required': 'Email є обов\'язковим',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Пароль є обов\'язковим',
    'string.min': 'Пароль повинен містити щонайменше 6 символів',
    'any.required': 'Пароль є обов\'язковим',
  }),
  role: Joi.string().valid('USER', 'WINERY_OWNER').default('USER'),
});

// Схема для входу користувача
export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email є обов\'язковим',
    'string.email': 'Будь ласка, введіть дійсну адресу електронної пошти',
    'any.required': 'Email є обов\'язковим',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Пароль є обов\'язковим',
    'string.min': 'Пароль повинен містити щонайменше 6 символів',
    'any.required': 'Пароль є обов\'язковим',
  }),
});
