const {Role} = require("../database/models/role.model");
const {ROLE_DOES_NOT_EXIST, UNAUTHORIZED} = require("../utils/constants.util");
const ApiError = require("../utils/ApiError");
const {verifyRoles} = require("./roleRecord.service");

exports.getRoles = async (filter) => {
    const existed = await checkRole(filter);

    if (!existed) throw ApiError.notFound(ROLE_DOES_NOT_EXIST);

    return existed;
}
//

// problem: need to use role record instead of role schema

//
exports.checkRole = checkRole = async (filter) => {
    const existed = await Role.find(filter);

    return existed.length !== 0 ? existed : null;
}

exports.verifyRole = async (allowedRoles, userRoles) => {
    const roles = await getRolesByID(userRoles);
    for (const role of roles) {
        if (allowedRoles.includes(role.name)) return true;
    }

    throw ApiError.unauthorized(UNAUTHORIZED);
}


// find several roles in array ids
exports.getRolesByID = getRolesByID = async (ids) => {
    // use to find role that have object_id in side array ids, use role:1 to filter role only without id
    // const roles = await Role.find({'_id': {$in: ids}}, {role: 1, _id: 0});
    const roles = await checkRole({'_id': {$in: ids}});
    if (!roles) throw ApiError.notFound(ROLE_DOES_NOT_EXIST);

    return roles;
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