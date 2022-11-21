const {
    createUser,
    getTokenNewUser,
    getAllUsers,
    deleteUser,
    updateUser,
    changePassword
} = require("../services/user.service");
const {User} = require("../database/models/user.model");
const {getRoles} = require("../services/role.service");
const {USER, ACTIVE} = require("../utils/constants.util");
const {RoleRecord} = require("../database/models/role.model");

const ApiError = require("../utils/ApiError");
const {runInTransaction} = require("../database/mongodb");
//  POST /users/signup
exports.signup = async (req, res, next) => {
    try {
        const {password, ...data} = req.body;
        Object.keys(data).forEach((property, index) => {
            if (typeof property === 'string' || property instanceof String) {
                data[property] = data[property].trim();
            }
        });
        const existedRoles = await getRoles({name: USER});

        const roleRecord = new RoleRecord({
            roleID: existedRoles[0],
            status: ACTIVE,
        });
        const userData = new User(data);

        const newUser = await runInTransaction(async (session) => {
            await roleRecord.save({session});
            userData.rolesList.push(roleRecord);

            return await createUser(userData, password);
        });

        res.status(200).json({
            newUser,
            success: true,
        })
    } catch (err) {
        next(err);
    }
}

// POST /users/login
exports.login = (req, res) => {
    const payload = {_id: req.user._id}
    const token = getTokenNewUser(payload);

    res.status(200).json(token);
}

// GET /users
exports.getUsers = async (req, res, next) => {
    try {
        const query = req.query;

        const users = await getAllUsers(query);

        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}
// PUT /users/_id
exports.updateUser = async (req, res, next) => {
    try {
        if (!req.user._id.equals(req.params._id)) {
            next(ApiError.unauthorized('NOT ALLOWED TO UPDATE OTHER USER'));
            return;
        }

        const updated = await updateUser(req.params._id, req.body);
        res.status(200).json(updated);

    } catch (err) {
        next(err)
    }
}

// DELETE /users/_id
exports.deleteUser = async (req, res, next) => {
    try {
        const deleted = await deleteUser(req.params._id);

        res.status(200).json(deleted);
    } catch (err) {
        next(err);
    }
}

//POST /users/change_password
exports.changePassword = async (req, res, next) => {
    try {
        const {oldPassword, newPassword} = req.body;

        const newUser = await changePassword(req.user._id, oldPassword, newPassword);
        res.status(200).json(newUser);
    } catch (err) {
        next(err);
    }
}