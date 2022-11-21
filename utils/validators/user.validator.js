const Joi = require("joi");

exports.createUserValidation = Joi.object({
    firstname: Joi.string().max(10).required(),
    lastname: Joi.string().max(10).required(),
    birthDate: Joi.date().max("now").required(),
    address: Joi.string().required(),
    username: [Joi.string().trim().lowercase().required(), Joi.string().email().required()],
    password: Joi.string().min(8).max(15).required(),
});

exports.loginUserValidation = Joi.object({
    username: [Joi.string().required(), Joi.string().email().required()],
    password: Joi.string().min(8).required(),
});

exports.updateUserValidation = Joi.object({
    firstname: Joi.string().max(10).optional(),
    lastname: Joi.string().max(10).optional(),
    birthdate: Joi.date().optional(),
    address: Joi.string().optional(),
    // password: Joi.string().min(8).max(15).optional(),
    // oldPassword: Joi.when('password', {
    //     is: Joi.exist(),
    //     then: Joi.string().min(8).max(15).required(),
    //     otherwise: Joi.forbidden(),
    // }) // add password confirmation as well
});

exports.changePasswordValidation = Joi.object({
    newPassword: Joi.string().min(8).max(15).required(),
    oldPassword: Joi.string().min(8).max(15).required(),
});
