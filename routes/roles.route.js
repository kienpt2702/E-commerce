const express = require("express");
const {createRole, getRoles, updateRole} = require("../controllers/role.controller");
const rolesRouter = express.Router();

rolesRouter.get('/', getRoles);
rolesRouter.post('/', createRole);
rolesRouter.put('/:_id', updateRole);

module.exports = rolesRouter;