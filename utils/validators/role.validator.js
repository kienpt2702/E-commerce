const Joi = require("joi");

exports.createRoleValidation = Joi.object({
    name: Joi.string().max(20).required(),
    description: Joi.string().max(40).optional(),
});

exports.updateRoleValidation = Joi.object({
    name: Joi.string().max(20).optional(),
    description: Joi.string().max(40).optional(),
});