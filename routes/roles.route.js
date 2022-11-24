const express = require("express");
const {createRole, getRoles, updateRole, deleteRole, requestRoles} = require("../controllers/role.controller");
const {validate} = require("../utils/validators/validate");
const {updateRoleValidation, createRoleValidation, requestUserRoleValidation} = require("../utils/validators/role.validator");
const {verifyJWT, verifyRole} = require("../utils/authenticate");
const {ADMIN} = require('../utils/constants.util');

const rolesRouter = express.Router();

rolesRouter.get('/', verifyJWT, verifyRole([ADMIN]), getRoles);
rolesRouter.post('/', verifyJWT, verifyRole([ADMIN]), validate(createRoleValidation), createRole);
rolesRouter.put('/:_id', verifyJWT, verifyRole([ADMIN]), validate(updateRoleValidation), updateRole);
rolesRouter.delete('/:_id', verifyJWT, verifyRole([ADMIN]), deleteRole);

module.exports = rolesRouter;