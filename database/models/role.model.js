const {model, Schema} = require('mongoose');

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
}, {
    strictQuery: false
});

exports.Role = model('Role', roleSchema);