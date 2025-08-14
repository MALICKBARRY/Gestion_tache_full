const joi =require('joi');

const memberSchema = joi.object({
    nom: joi.string().min(3).required(),
    email: joi.string().email().required(),
    role: joi.string().valid('chef', 'membre').optional()
});

module.exports = memberSchema;