const Joi = require("joi");

exports.createUserValidation = Joi.object({
    firstname: Joi.string().max(10).required(),
    lastname: Joi.string().max(10).required(),
    username: [Joi.string().required(), Joi.string().email().required()],
    password: Joi.string().min(8).required(),
});


