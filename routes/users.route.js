const express = require('express');
const {signup, login, getUsers, deleteUser, updateUser, changePassword} = require("../controllers/user.controller");
const {verifyUsernamePassword, verifyJWT, verifyRole} = require("../utils/authenticate");
const {validate} = require("../utils/validators/validate");
const {createUserValidation, loginUserValidation, updateUserValidation, changePasswordValidation} = require("../utils/validators/user.validator");
const {ADMIN} = require('../utils/constants.util');

const userRouter = express.Router();

/* GET users listing. */

userRouter.get('/', verifyJWT, verifyRole([ADMIN]), getUsers);
userRouter.post('/signup', validate(createUserValidation), signup);
userRouter.post('/login', validate(loginUserValidation), verifyUsernamePassword, login);
userRouter.put('/:_id', verifyJWT, validate(updateUserValidation), updateUser);
userRouter.delete('/:_id', verifyJWT, verifyRole([ADMIN]), deleteUser);
userRouter.post('/change_password', verifyJWT, validate(changePasswordValidation), changePassword);

module.exports = userRouter;
