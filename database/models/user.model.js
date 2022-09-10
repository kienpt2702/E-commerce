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
    admin: {
        type: Boolean,
        default: false,
    }
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
const UserModel = model('User', userSchema);

exports.User = UserModel;