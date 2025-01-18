const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getImage = async (req, res) => {
    const { gfs } = await require("../config/dbConn")();

    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ error: "No file exists" });
        }

        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    });
};
