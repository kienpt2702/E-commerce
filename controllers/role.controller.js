const {updateRole, getRoles, checkRole, createRoles} = require("../services/role.service");
const ApiError = require("../utils/ApiError");
const {ROLE_ALREADY_EXIST} = require("../utils/constants.util");
// POST /roles
exports.createRole = async (req, res, next) => {
    try {
        const newRole = await createRoles(req.body);

        res.status(201).json(newRole);
    } catch (err) {
        next(err);
    }
}
// GET /roles
exports.getRoles = async (req, res, next) => {
    try {
        const query = req.query;
        const roles = await getRoles(query);

        res.status(200).json(roles);
    } catch (err) {
        next(err);
    }
}
// PUT /roles/:_id
exports.updateRole = async (req, res, next) => {
    try {
        const _id = req.params._id;
        const data = req.body;
        const updated = await updateRole(_id, data);

        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
}
