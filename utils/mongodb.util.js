const mongoose = require("mongoose");
const {DB_URL} = require("./config.util");
module.exports = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('connected to db server')
    } catch (err) {
        console.log(err)
    }

}