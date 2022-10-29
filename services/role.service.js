const {Role} = require("../database/models/role.model");
const {ROLE_DOES_NOT_EXIST, ROLE_ALREADY_EXIST} = require("../utils/constants.util");
const ApiError = require("../utils/ApiError");

exports.getRole = async (filter) => {
    const existed = await checkRole(filter);

    if (!existed) throw ApiError.notFound(ROLE_DOES_NOT_EXIST);

    return existed;
}

exports.checkRole = checkRole = async (filter) => {
    const existed = await Role.find(filter);
    console.log(existed)
    return existed.length !== 0 ? existed : null;
}


// find several roles in array ids
exports.getRolesByID = async (ids) => {
    // use to find role that have object_id in side array ids, use role:1 to filter role only without id
    const roles = await Role.find({'_id': {$in: ids}}, {role: 1, _id: 0});

    if (!roles) throw ApiError.notFound(ROLE_DOES_NOT_EXIST);

    return roles;
}

exports.createOrUpdate = async (filters, data) => {
    // set upsert to true so that when does not find any match filter, it create a new one base on the filter and data
    // set rawResult to true so that we can check whether we update or create a new document in db
    const role = await Role.findOneAndUpdate(filters, data, {
        upsert: true,
        returnOriginal: false,
        //rawResult: true,
    });

    return role;
}