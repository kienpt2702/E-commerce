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
    birthDate: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role',
    }],
    rolesList: [{
        type: Schema.Types.ObjectId,
        ref: 'RoleRecord',
    }]
}, {
    // https://mongoosejs.com/docs/guide.html#strictQuery
    // set strictQuery to false because by default, strict option is true, meaning
    // that any attribute that does not in the schema will be striped out
    // e.g {notInSchema: true} will be striped out to {} => get will return everything
    strictQuery: false,
    timestamps: true,
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
