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
const {RoleRecord} = require("../database/models/roleRecord.model");

const ApiError = require("../utils/ApiError");
const {runInTransaction} = require("../database/mongodb");
const {requestRoles, approveRoles} = require("../services/roleRecord.service");
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

        const userData = new User(data);

        const roleRecord = new RoleRecord({
            roleID: existedRoles[0],
            status: ACTIVE,
            requestedBy: userData._id,
            updatedBy: userData._id,
        });

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

// GET /users/:_id
exports.getUser = async (req, res, next) => {
    try {
        let user = req.user;
        if(!req.user._id.equals(req.params._id)) {
            user = (await getAllUsers({_id: req.params._id}))[0];
        }

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

// POST /users/account/password
exports.changePassword = async (req, res, next) => {
    try {
        const {oldPassword, newPassword} = req.body;

        const newUser = await changePassword(req.user._id, oldPassword, newPassword);
        res.status(200).json(newUser);
    } catch (err) {
        next(err);
    }
}

// POST /users/account/roles
exports.requestRole = async (req, res, next) => {
    try {
        const {role, reason} = req.body;
        // verify with jwt, req.user is loaded
        const requested = await requestRoles(req.user, role, reason);
        res.status(200).json(requested);
    } catch (err) {
        next(err);
    }
}

// PUT /users/account/roles
exports.updateUserRoles = async (req, res, next) => {
    try {
        const {roleRequestIDs, status} = req.body;
        const approve = await approveRoles(roleRequestIDs, status);

        res.status(200).json(approve);
    } catch (err) {
        next(err);
    }
}