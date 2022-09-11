const {User} = require("../database/models/user.model");
const {getToken} = require("../utils/authenticate");
const {Role} = require("../database/models/role.model");

const createUser = async (user, password) => {
    const newUser = await User.register(user, password);

    if (!newUser) throw new Error('SIGNUP UNSUCCESSFULLY');

    return newUser;
}

const getTokenNewUser = (payload) => {
    return getToken(payload);
}

const getAllUsers = async (query) => {
    const users = await User.find(query).populate('roles');

    if(!users) throw new Error('GET UNSUCCESSFULLY');

    return users;

}
module.exports = {
    createUser,
    getTokenNewUser,
    getAllUsers,
}
