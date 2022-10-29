const {User} = require("../database/models/user.model");
const {getToken} = require("../utils/authenticate");
const {Role} = require("../database/models/role.model");
const {getRole, createOrUpdate} = require("./role.service");
const ApiError = require("../utils/ApiError");
const {USER_NOT_FOUND} = require("../utils/constants.util");

exports.createUser = async (user, password) => {
    const newUser = await User.register(user, password);

    if (!newUser) throw ApiError.badRequest('SIGNUP UNSUCCESSFULLY');

    return newUser;
}

exports.createNewRole = async (name, data) => {

    //always throw the error or object extended from error class. Also need to catch error and pass in to handler in the controller

    const newRole = await createOrUpdate({name}, data);

    return newRole;
}

exports.getTokenNewUser = (payload) => {
    return getToken(payload);
}

exports.getAllUsers = async (query) => {
    const users = await User.find(query).populate('roles');

    if(!users) throw ApiError.notFound(USER_NOT_FOUND);

    return users;

}
