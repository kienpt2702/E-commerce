const {model, Schema} = require('mongoose');

const roleSchema = new Schema({
    role: {
        type: String,
        required: true,
    },
    description: String,
});

exports.Role = model('Role', roleSchema);