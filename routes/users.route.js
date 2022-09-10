var express = require('express');
const {signup, login, getAllUsers} = require("../services/user.service");
const {verifyUsernamePassword, verifyJWT, verifyAdmin} = require("../utils/authentication");
var userRouter = express.Router();

/* GET users listing. */

userRouter.get('/', verifyJWT, verifyAdmin, getAllUsers);
userRouter.post('/signup', signup);
userRouter.post('/login', verifyUsernamePassword, login);
module.exports = userRouter;
