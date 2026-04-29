import * as Joi from 'joi';

export const joiValidationSchema = Joi.object({
  MONGODB: Joi.string().required(),
  DEFAULT_LIMIT: Joi.number().integer().positive().required(),
  PORT: Joi.number().integer().positive().required(),
});
