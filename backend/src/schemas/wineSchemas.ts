import Joi from 'joi';

export const createWineSchema = Joi.object({
  name: Joi.string().required(),
  winery: Joi.string().required(),
  vintage: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear() + 10)
    .required(),
  grape: Joi.string().required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().allow('').optional(),
  tastingNotes: Joi.array().items(Joi.string()).optional(),
  imageUrl: Joi.string().uri().allow('').optional(),
  color: Joi.string().valid('red', 'white', 'rose', 'orange').required(),
  sweetness: Joi.string().valid('dry', 'semi-dry', 'semi-sweet', 'sweet').required(),
  volume: Joi.number().optional(),
  boxQuantity: Joi.number().optional(),
  hasPackaging: Joi.boolean().optional(),
  alcohol: Joi.string().allow('').optional(),
  decanting: Joi.boolean().optional(),
  bottleDiameter: Joi.string().allow('').optional(),
  servingTemperature: Joi.string().allow('').optional(),
  foodPairing: Joi.array().items(Joi.string()).optional(),
  supplier: Joi.string().allow('').optional(),
  suffix: Joi.string().allow('').optional(),
  isVip: Joi.boolean().optional(),
  inStock: Joi.boolean().optional(),
  buyLink: Joi.string().uri().allow('').optional(),

  // Frontend-only fields used for autofill
  region: Joi.string().allow('').optional(),
  country: Joi.string().allow('').optional(),
  manufacturer: Joi.string().allow('').optional(),
}).unknown(true);

export const updateWineSchema = Joi.object({
  name: Joi.string().optional(),
  grape: Joi.string().optional(),
  price: Joi.number().min(0).optional(),
  description: Joi.string().allow('').optional(),
  tastingNotes: Joi.array().items(Joi.string()).optional(),
  imageUrl: Joi.string().uri().allow('').optional(),
  color: Joi.string().valid('red', 'white', 'rose', 'orange').optional(),
  sweetness: Joi.string().valid('dry', 'semi-dry', 'semi-sweet', 'sweet').optional(),
  volume: Joi.number().optional(),
  boxQuantity: Joi.number().optional(),
  hasPackaging: Joi.boolean().optional(),
  alcohol: Joi.string().allow('').optional(),
  decanting: Joi.boolean().optional(),
  bottleDiameter: Joi.string().allow('').optional(),
  servingTemperature: Joi.string().allow('').optional(),
  foodPairing: Joi.array().items(Joi.string()).optional(),
  supplier: Joi.string().allow('').optional(),
  suffix: Joi.string().allow('').optional(),
  isVip: Joi.boolean().optional(),
  inStock: Joi.boolean().optional(),
  buyLink: Joi.string().uri().allow('').optional(),

  region: Joi.string().allow('').optional(),
  country: Joi.string().allow('').optional(),
  manufacturer: Joi.string().allow('').optional(),
})
  .min(1)
  .unknown(true);
