const Joi = require("joi");
const {ACTIVE, PENDING, INACTIVE} = require('../constants.util');

exports.createRoleValidation = Joi.object({
    name: Joi.string().max(20).required(),
    description: Joi.string().max(40).optional(),
});

exports.updateRoleValidation = Joi.object({
    description: Joi.string().max(40).optional(),
});

exports.requestUserRoleValidation = Joi.object({
    role: Joi.string().hex().length(24).required(),
    reason: Joi.string().max(200).required(),
});

exports.updateUserRoleValidation = Joi.object({
    roleRequestIDs: Joi.array().items(Joi.string().hex().length(24).required()).required(),
    status: Joi.string().valid(ACTIVE, PENDING, INACTIVE).required(),
});