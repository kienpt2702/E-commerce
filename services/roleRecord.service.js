const {RoleRecord} = require("../database/models/role.model");

exports.deleteRecords = async (ids, option) => {
    const deletedRecords = await RoleRecord.deleteMany({_id: {$in: ids}}, option);

    return deletedRecords;
}