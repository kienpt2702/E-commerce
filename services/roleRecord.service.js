const {RoleRecord} = require("../database/models/roleRecord.model");
const {ACTIVE} = require('../utils/constants.util');
const {runInTransaction} = require("../database/mongodb");
const ApiError = require("../utils/ApiError");
const {getRoles} = require("./role.service");

exports.deleteRecords = async (ids, option) => {
    const deletedRecords = await RoleRecord.deleteMany({_id: {$in: ids}}, option);

    return deletedRecords;
}

exports.requestRoles = async (user, roleID, reason = 'NULL') => {
    console.log(user)
    for(const existed of user.rolesList) {
        if(existed.roleID._id.equals(roleID) && existed.status === ACTIVE) throw ApiError.badRequest(`REQUESTED ROLE IS ALREADY ${ACTIVE}`);
    }
    // this throw error if role does not exist
    await getRoles({_id: roleID});

    // fix populate role only when need verify role, does not when only verify jwt

    return await runInTransaction(async session => {
        let updated = {
            reason,
            requestedBy: user._id,
            updatedBy: user._id,
        };
        updated = await RoleRecord.findOneAndUpdate({requestedBy: user._id, roleID}, updated, {
            session,
            upsert: true,
            new: true,
            rawResult: true,
        });
        // if not update existed request-> create new role Request -> push new request
        // reference: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
        // set upsert to true so that when does not find any match filter, it create a new one base on the filter and data
        // set rawResult to true so that we can check whether we update or create a new document in db
        if(!updated.lastErrorObject.updatedExisting) {
            user.rolesList.push(updated.value._id);
            await user.save(session);
        }

        return updated.value;
    });
}