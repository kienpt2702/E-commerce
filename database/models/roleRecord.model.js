const {model, Schema} = require('mongoose');
const {PENDING} = require('../../utils/constants.util');

const option = {
    timestamps: true,
    strictQuery: false
};

const roleRecord = new Schema({
    roleID: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: PENDING,
    },
    requestedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reason: {
        type: String,
        required: true,
        default: 'CREATE USER'
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, option);

exports.RoleRecord = model('RoleRecord', roleRecord);