const {User} = require("../database/models/user.model");
const {getToken} = require("../utils/authenticate");

const signup = async (req, res, next) => {
    try {
        let {username, firstname, lastname} = req.body;
        username = username.trim();
        firstname = firstname.trim();
        lastname = lastname.trim();
        const newUser = new User({
            username,
            firstname,
            lastname,
        });
        await User.register(newUser, req.body.password);

        res.status(200).json({
            newUser,
            success: true,
        });
    } catch (err) {
        next(err);
    }
}

const login = (req, res) => {
    const token = getToken({_id: req.user._id});
    res.status(200).json(token);
}

const getAllUsers = async (req, res, next) => {
    try {
        console.log(req.user)
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}
module.exports = {
    signup,
    login,
    getAllUsers,
}
