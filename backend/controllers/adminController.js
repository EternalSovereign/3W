const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find().select("name socialMediaHandle images");
    res.status(200).json(users);
});

exports.getUserById = expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId).select(
        "name socialMediaHandle images"
    );
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
});
