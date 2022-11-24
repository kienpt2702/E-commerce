const express = require('express');
const {signup, login, getUsers, deleteUser, updateUser, changePassword, requestRole, getUser, updateUserRoles} = require("../controllers/user.controller");
const {verifyUsernamePassword, verifyJWT, verifyRole} = require("../utils/authenticate");
const {validate} = require("../utils/validators/validate");
const {createUserValidation, loginUserValidation, updateUserValidation, changePasswordValidation} = require("../utils/validators/user.validator");
const {ADMIN, ALL} = require('../utils/constants.util');
const {requestUserRoleValidation, updateUserRoleValidation} = require("../utils/validators/role.validator");

const userRouter = express.Router();

/* GET users listing. */

userRouter.get('/', verifyJWT, verifyRole([ADMIN]), getUsers);
userRouter.post('/signup', validate(createUserValidation), signup);
userRouter.post('/login', validate(loginUserValidation), verifyUsernamePassword, login);
userRouter.get('/:_id', verifyJWT, verifyRole(ALL), getUser);
userRouter.put('/:_id', verifyJWT, validate(updateUserValidation), updateUser);
userRouter.delete('/:_id', verifyJWT, verifyRole([ADMIN]), deleteUser);
userRouter.post('/account/password', verifyJWT, validate(changePasswordValidation), changePassword);
userRouter.post('/account/roles', verifyJWT, verifyRole(ALL), validate(requestUserRoleValidation), requestRole);
userRouter.put('/account/roles', verifyJWT, verifyRole([ADMIN]), validate(updateUserRoleValidation), updateUserRoles);


module.exports = userRouter;
