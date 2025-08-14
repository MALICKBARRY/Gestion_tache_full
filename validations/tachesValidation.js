const Joi = require('joi');

const taskSchema = Joi.object({
  titre: Joi.string().required(),
  description: Joi.string().required().allow(''),
  priorite: Joi.string().required().valid('élevée', 'moyenne', 'faible'),
  status: Joi.string().required().valid('en cours', 'terminée'),
  assigneA: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional(),
  dateEch: Joi.date().iso().required()
});

module.exports = taskSchema;
