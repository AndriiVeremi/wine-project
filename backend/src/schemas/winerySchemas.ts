import Joi from 'joi';

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegexp = /^\+\d{10,14}$/;

export const registerWinerySchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  history: Joi.string().min(10),
  country: Joi.string().required(),
  region: Joi.string().required(),
  address: Joi.string().required().min(5),
  logoUrl: Joi.string().uri().allow('', null).optional(),
  galleryUrl: Joi.array().items(Joi.string().uri()).allow(null).optional(),
  whereToBuy: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        url: Joi.string().uri().required(),
      }),
    )
    .allow(null),
  contactEmail: Joi.string().pattern(emailRegexp).required(),
  contactPhone: Joi.string().pattern(phoneRegexp).required(),
  coordinates: Joi.alternatives()
    .try(
      Joi.object({
        lat: Joi.number().required(),
        lng: Joi.number().required(),
      }),
      Joi.string(),
    )
    .optional(),
  websiteUrl: Joi.string().uri().allow('', null),
  videoUrl: Joi.string().uri().allow('', null),
}).unknown(true);

export const updateWinerySchema = Joi.object({
  name: Joi.string().min(3).max(100),
  history: Joi.string().min(10),
  country: Joi.string(),
  region: Joi.string(),
  address: Joi.string().min(5),
  logoUrl: Joi.string().uri().allow('', null).optional(),
  galleryUrl: Joi.array().items(Joi.string().uri()).allow(null).optional(),
  whereToBuy: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        url: Joi.string().uri().required(),
      }),
    )
    .allow(null),
  contactEmail: Joi.string().pattern(emailRegexp),
  contactPhone: Joi.string().pattern(phoneRegexp),
  coordinates: Joi.alternatives()
    .try(
      Joi.object({
        lat: Joi.number().required(),
        lng: Joi.number().required(),
      }),
      Joi.string(),
    )
    .optional(),
  websiteUrl: Joi.string().uri().allow('', null),
  videoUrl: Joi.string().uri().allow('', null),
})
  .min(1)
  .unknown(true);
