const {Role} = require("../database/models/role.model");
const {ROLE_DOES_NOT_EXIST, UNAUTHORIZED} = require("../utils/constants.util");
const ApiError = require("../utils/ApiError");

exports.getRoles = async (filter) => {
    const existed = await checkRole(filter);

    if (!existed) throw ApiError.notFound(ROLE_DOES_NOT_EXIST);

    return existed;
}

exports.checkRole = checkRole = async (filter) => {
    const existed = await Role.find(filter).populate('updatedBy', ['firstname', 'lastname']);

    return existed.length !== 0 ? existed : null;
}

exports.updateRole = async (filters, data) => {
    // set upsert to true so that when does not find any match filter, it create a new one base on the filter and data
    // set rawResult to true so that we can check whether we update or create a new document in db
    const role = await Role.findOneAndUpdate(filters, data, {
        //upsert: true,
        returnOriginal: false,
        //rawResult: true,
    });

    if (!role) throw ApiError.notFound(ROLE_DOES_NOT_EXIST);

    return role;
}

exports.createRoles = async (data) => {
    const role = new Role(data);

    return await role.save();
}