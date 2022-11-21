const {User} = require("../database/models/user.model");
const {getToken} = require("../utils/authenticate");
const ApiError = require("../utils/ApiError");
const {USER_NOT_FOUND} = require("../utils/constants.util");
const {runInTransaction} = require("../database/mongodb");
const {deleteRecords} = require("./roleRecord.service");

exports.createUser = async (user, password) => {
    const newUser = await User.register(user, password);

    if (!newUser) throw ApiError.badRequest('SIGNUP UNSUCCESSFULLY');

    return newUser;
}

exports.getTokenNewUser = (payload) => {
    return getToken(payload);
}

exports.getAllUsers = async (query) => {
    const users = await User.find(query).populate(['rolesList']);

    if(!users) throw ApiError.notFound(USER_NOT_FOUND);

    return users;

}

exports.deleteUser = async (userID) => {
    const deleted = await runInTransaction(async (session) => {
        const user = await User.findByIdAndDelete(userID, {session});

        await deleteRecords(user.rolesList, {session});

        return user;
    });

    return deleted;
}

exports.updateUser = async (userID, data) => {
    const updated = await User.findByIdAndUpdate(userID, data, {new: true});

    if(!updated) throw ApiError.badRequest(USER_NOT_FOUND);

    return updated;
}

exports.changePassword = async (userID, oldPassword, newPassword) => {
    if(oldPassword === newPassword) {
        throw ApiError.badRequest('CANT CHANGE PASSWORD');
    }

    const user = await User.findById(userID);
    if(!user) throw ApiError.notFound(USER_NOT_FOUND);

    return await user.changePassword(oldPassword, newPassword);
}