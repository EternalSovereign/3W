const mongoose = require("mongoose");
const gridfsStream = require("gridfs-stream");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.Database_URL);
        const gfs = gridfsStream(conn.connection.db, mongoose.mongo);
        gfs.collection("uploads"); // Collection for GridFS
        return { conn, gfs };
    } catch (error) {
        console.log("MongoDB connection failed");
    }
};

module.exports = connectDB;
