const express = require('express');
const {signup, login, getUsers, deleteUser, updateUser, changePassword, requestRoles, getMyUser} = require("../controllers/user.controller");
const {verifyUsernamePassword, verifyJWT, verifyRole} = require("../utils/authenticate");
const {validate} = require("../utils/validators/validate");
const {createUserValidation, loginUserValidation, updateUserValidation, changePasswordValidation} = require("../utils/validators/user.validator");
const {ADMIN, ALL} = require('../utils/constants.util');
const {requestRoleValidation} = require("../utils/validators/role.validator");

const userRouter = express.Router();

/* GET users listing. */

userRouter.get('/', verifyJWT, verifyRole([ADMIN]), getUsers);
userRouter.post('/signup', validate(createUserValidation), signup);
userRouter.post('/login', validate(loginUserValidation), verifyUsernamePassword, login);
userRouter.put('/:_id', verifyJWT, validate(updateUserValidation), updateUser);
userRouter.delete('/:_id', verifyJWT, verifyRole([ADMIN]), deleteUser);
userRouter.get('/account', verifyJWT, verifyRole(ALL), getMyUser);
userRouter.post('/account/password', verifyJWT, validate(changePasswordValidation), changePassword);
userRouter.post('/account/roles', verifyJWT, verifyRole(ALL), validate(requestRoleValidation), requestRoles);


module.exports = userRouter;
