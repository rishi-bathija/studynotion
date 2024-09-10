const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connection successfull");
    } catch (error) {
        console.log("DB connection issues");
        console.log(error);
        process.exit(1);
    }
}