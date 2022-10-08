const {User} = require("../database/models/user.model");
const {getToken} = require("../utils/authenticate");
const {Role} = require("../database/models/role.model");
const {getRoleByName} = require("./role.service");
const ApiError = require("../utils/ApiError");
const {USER_NOT_FOUND} = require("../utils/constants.util");

const createUser = async (user, password) => {
    const newUser = await User.register(user, password);

    if (!newUser) throw new Error('SIGNUP UNSUCCESSFULLY');

    return newUser;
}

const createRole = async (role) => {
    const exist = await getRoleByName(role);
    if(exist) throw new Error('')
    //always throw the error or object extended from error class. Also need to catch error and pass in to handler in the controller
}

const getTokenNewUser = (payload) => {
    return getToken(payload);
}

const getAllUsers = async (query) => {
    const users = await User.find(query).populate('roles');

    if(!users) throw ApiError.badRequest(USER_NOT_FOUND);

    return users;

}

module.exports = {
    createUser,
    getTokenNewUser,
    getAllUsers,
}
