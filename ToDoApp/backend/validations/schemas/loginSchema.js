const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
    username: Joi.string().min(3).required().email(), 
    password: Joi.string().min(3).required()
});

module.exports.loginSchema = loginSchema;