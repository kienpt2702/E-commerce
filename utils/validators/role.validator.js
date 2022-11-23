const Joi = require("joi");

exports.createRoleValidation = Joi.object({
    name: Joi.string().max(20).required(),
    description: Joi.string().max(40).optional(),
});

exports.updateRoleValidation = Joi.object({
    name: Joi.string().max(20).optional(),
    description: Joi.string().max(40).optional(),
});

exports.requestRoleValidation = Joi.object({
    role: Joi.string().hex().length(24).required(),
    reason: Joi.string().max(200).required(),
});