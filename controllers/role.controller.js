const {createOrUpdate, getRole, checkRole} = require("../services/role.service");
const ApiError = require("../utils/ApiError");
const {ROLE_ALREADY_EXIST} = require("../utils/constants.util");

exports.createRole = async (req, res, next) => {
    try {
        const {name, ...data} = req.body;
        if(!name) throw new Error('MISSING NAME');

        const existedRoles = await checkRole({role: name});
        if(existedRoles) throw ApiError.badRequest(ROLE_ALREADY_EXIST);

        const newRole = await createOrUpdate({role: name}, data);

        res.status(200).json(newRole);
    }
    catch (err) {
        next(err);
    }
}

exports.getRole = async (req, res, next) => {
    try {
        const query = req.query;
        const roles = await getRole(query);

        res.status(200).json(roles);

    } catch (err) {
        next(err);
    }
}