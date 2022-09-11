const {Schema, model} = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role',
    }],

});

//configure option for passport local mongoose
const options = {
    errorMessages: {
        UserExistsError: 'Username already existed',
        IncorrectUsernameError: 'Username does not exist',
        IncorrectPasswordError: 'Incorrect password',
    }
};

userSchema.plugin(passportLocalMongoose, options);
exports.User = model('User', userSchema);
