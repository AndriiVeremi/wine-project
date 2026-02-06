import Joi from 'joi';

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegexp = /^\+\d{10,14}$/;

export const registerWinerySchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  history: Joi.string().min(10),
  country: Joi.string().required(),
  region: Joi.string().required(),
  address: Joi.string().required().min(5),
  logoUrl: Joi.string().uri(),
  galleryUrl: Joi.array().items(Joi.string().uri()),
  whereToBuy: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      url: Joi.string().uri().required(),
    }),
  ),
  contactEmail: Joi.string().pattern(emailRegexp).required(),
  contactPhone: Joi.string().pattern(phoneRegexp).required(),
});

export const updateWinerySchema = Joi.object({
  name: Joi.string().min(3).max(100),
  history: Joi.string().min(10),
  country: Joi.string(),
  region: Joi.string(),
  address: Joi.string().min(5),
  logoUrl: Joi.string().uri(),
  galleryUrl: Joi.array().items(Joi.string().uri()),
  whereToBuy: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      url: Joi.string().uri().required(),
    }),
  ),
  contactEmail: Joi.string().pattern(emailRegexp),
  contactPhone: Joi.string().pattern(phoneRegexp),
}).min(1);
