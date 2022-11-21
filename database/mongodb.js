const mongoose = require("mongoose");
const {DB_URL} = require("../utils/config.util");

exports.initMongoDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('connected to db server')
    } catch (err) {
        console.log(err)
    }
}

exports.runInTransaction = async (callback) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const res = await callback(session);
        // commit the changes to db
        await session.commitTransaction();
        return res;
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        await session.endSession();
    }
}

