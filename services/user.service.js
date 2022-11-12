const {User} = require("../database/models/user.model");
const {getToken} = require("../utils/authenticate");
const ApiError = require("../utils/ApiError");
const {USER_NOT_FOUND} = require("../utils/constants.util");
const {getRolesByID} = require("./role.service");

exports.createUser = async (user, password) => {
    const newUser = await User.register(user, password);

    if (!newUser) throw ApiError.badRequest('SIGNUP UNSUCCESSFULLY');

    return newUser;
}

exports.getTokenNewUser = (payload) => {
    return getToken(payload);
}

exports.getAllUsers = async (query) => {
    const users = await User.find(query).populate(['roles', 'rolesList']);


    if(!users) throw ApiError.notFound(USER_NOT_FOUND);

    return users;

}

exports.addRoles = async (user_id, roles) => {
    const newRoles = await getRolesByID(roles);


}