const {model, Schema} = require('mongoose');
const Joi = require("joi");

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
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


const validateRoleRecord = Joi.object({
    roleID: Joi.string().required(),
    status: Joi.string().required(),
    updatedBy: Joi.string().required()
});

exports.Role = model('Role', roleSchema);
exports.RoleRecord = model('RoleRecord', roleRecord);
exports.validateRoleRecord = validateRoleRecord;