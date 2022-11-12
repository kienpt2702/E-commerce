const {RoleRecord} = require("../database/models/role.model");
exports.verifyRoles = async (roleRecordIDs) => {
    const roles = await RoleRecord.find({'_id': {$in: roleRecordIDs}}).populate('roleID');
    console.log(roles);
}