const {Role} = require("../database/models/role.model");
const {ROLE_DOES_NOT_EXIST} = require("../utils/constants.util");
const ApiError = require("../utils/ApiError");
const getRoleByName = async (role) => {
    const existed = await Role.findOne({role});

    if(!existed) throw ApiError.badRequest(ROLE_DOES_NOT_EXIST)

    return existed;
}

const getRolesByID = async (ids) => {
    // use to find role that have object_id in side array ids, use role:1 to filter role only without id
    const roles = await Role.find({'_id': { $in: ids }}, {role: 1, _id: 0});

    if(!roles) throw ApiError.badRequest(ROLE_DOES_NOT_EXIST);

    return roles;
}

const createRole = async (name) => {
    await getRoleByName(name);
}
module.exports = {
    getRoleByName,
    getRolesByID,
    createRole
}