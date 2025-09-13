const Joi = require('joi');

const taskSchema = Joi.object({
  titre: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  priorite: Joi.string().valid('élevée', 'moyenne', 'faible').default('moyenne'),
  status: Joi.string().valid('en cours', 'terminée').default('en cours'),
  assigneA: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional(),
  dateEch: Joi.date().iso().optional()
});

module.exports = taskSchema;
