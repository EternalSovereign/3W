const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Database_URL);
    } catch (error) {
        console.log("MongoDB connection failed");
        console.log(error);
    }
};

module.exports = connectDB;
