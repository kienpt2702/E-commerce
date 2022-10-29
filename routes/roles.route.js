const express = require("express");
const {createRole, getRole} = require("../controllers/role.controller");
const rolesRouter = express.Router();

rolesRouter.get('/', getRole);
rolesRouter.post('/', createRole);

module.exports = rolesRouter;