const {model, Schema} = require('mongoose');

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        required: true,
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

exports.Role = model('Role', roleSchema);