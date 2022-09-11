const {Role} = require("../database/models/role.model");
const getRole = async (role) => {
    const existed = await Role.findOne({role});

    if(!existed) throw Error('CANNOT GET DEFAULT ROLE');

    return existed._id;
}

module.exports = {
    getRole,
}