import Joi from 'joi';

export const createGrapeSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  type: Joi.string().valid('red', 'white', 'rose').required(),
  imageUrls: Joi.array().items(Joi.string().uri()).optional(),
  regions: Joi.array().items(Joi.string()).optional(),
  acidity: Joi.string().valid('Low', 'Medium', 'High', 'Very High').required(),
  body: Joi.string().valid('Light', 'Medium', 'Full-bodied').required(),
  tannins: Joi.string().valid('Low', 'Medium', 'High', 'None').optional(),
  aromas: Joi.array().items(Joi.string()).optional(),
  agingPotential: Joi.string().allow('').optional(),
});

export const updateGrapeSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().allow('').optional(),
  type: Joi.string().valid('red', 'white', 'rose').optional(),
  imageUrls: Joi.array().items(Joi.string().uri()).optional(),
  regions: Joi.array().items(Joi.string()).optional(),
  acidity: Joi.string().valid('Low', 'Medium', 'High', 'Very High').optional(),
  body: Joi.string().valid('Light', 'Medium', 'Full-bodied').optional(),
  tannins: Joi.string().valid('Low', 'Medium', 'High', 'None').optional(),
  aromas: Joi.array().items(Joi.string()).optional(),
  agingPotential: Joi.string().allow('').optional(),
}).min(1);
