const joi = require('joi');

exports.registerSchema = joi.object({
    nom: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    role: joi.string().valid('admin', 'user').optional()
});

exports.loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
});