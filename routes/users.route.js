const express = require('express');
const {signup, login, getUsers} = require("../controllers/user.controller");
const {verifyUsernamePassword, verifyJWT, verifyAdmin} = require("../utils/authenticate");
const {validate} = require("../utils/validators/validate");
const {createUserValidation} = require("../utils/validators/user.validator");

const userRouter = express.Router();

/* GET users listing. */

userRouter.get('/', verifyJWT, verifyAdmin, getUsers);
userRouter.post('/signup', validate(createUserValidation), signup);
userRouter.post('/login', verifyUsernamePassword, login);
module.exports = userRouter;
