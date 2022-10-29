const {createUser, getTokenNewUser, getAllUsers} = require("../services/user.service");
const {User} = require("../database/models/user.model");
const {getRoles} = require("../services/role.service");
const {USER, ROLE_DOES_NOT_EXIST} = require("../utils/constants.util");
const {Role} = require("../database/models/role.model");

const ApiError = require("../utils/ApiError");
//  POST /users/signup
exports.signup = async (req, res, next) => {
    try {
        // use joi to validate input later
        let {username, firstname, lastname, password} = req.body;
        username = username.trim();
        firstname = firstname.trim();
        lastname = lastname.trim();

        const userData = new User({
            username,
            firstname,
            lastname,
            roles: []
        });

        const existedRoles = await getRoles({name: USER});
        userData.roles.push(existedRoles[0]);

        const newUser = await createUser(userData, password);

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

exports.addRoles = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}
