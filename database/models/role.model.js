const {model, Schema} = require('mongoose');
const Joi = require("joi");

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
}, {
    strictQuery: false,
    timestamps: true,
});

const roleRecord = new Schema({
    roleID: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'PENDING'
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true,
    strictQuery: false
});

const validateRole = Joi.object({
    name: Joi.string().max(20).required(),
    description: Joi.string().max(40).optional(),
});

const validateRoleRecord = Joi.object({
    roleID: Joi.string().required(),
    status: Joi.string().required(),
    updatedBy: Joi.string().required()
});

exports.Role = model('Role', roleSchema);
exports.RoleRecord = model('RoleRecord', roleRecord);
exports.validateRole = validateRole;
exports.validateRoleRecord = validateRoleRecord;