import Joi from 'joi';

const chatHistorySchema = Joi.object({
  role: Joi.string().valid('user', 'model').required(),
  parts: Joi.array()
    .items(
      Joi.object({
        text: Joi.string().required(),
      }),
    )
    .required(),
});

export const aiChatSchema = Joi.object({
  message: Joi.string().required().messages({
    'string.empty': 'Message cannot be empty.',
    'any.required': 'The "message" field is required.',
  }),
  history: Joi.array().items(chatHistorySchema).optional(),
  userName: Joi.string().optional(),
});
