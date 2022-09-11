const {createUser, getTokenNewUser, getAllUsers} = require("../services/user.service");
const {User} = require("../database/models/user.model");
const {getRole} = require("../services/role.service");

//  POST /users/signup
const signup = async (req, res, next) => {
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
        });
        const role = await getRole('ADMIN');
        userData.roles.push(role);

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
const login = (req, res) => {
    const payload = {_id: req.user._id}
    const token = getTokenNewUser(payload);

    res.status(200).json(token);
}

// GET /users
const getUsers = async (req, res, next) => {
    try {
        const query = req.query;

        const users = await getAllUsers(query);
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}
module.exports = {
    signup,
    login,
    getUsers,
}
