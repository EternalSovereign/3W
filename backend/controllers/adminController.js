const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find().select("name socialMediaHandle imagePaths");

    // Convert image paths to accessible URLs
    const usersWithImageUrls = users.map((user) => ({
        _id: user._id,
        name: user.name,
        socialMediaHandle: user.socialMediaHandle,
        images: user.imagePaths.map(
            (imagePath) => `${req.protocol}://${req.get("host")}/${imagePath}`
        ),
    }));

    res.status(200).json(usersWithImageUrls);
});

exports.getUserById = expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId).select(
        "name socialMediaHandle imagePaths"
    );
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Convert image paths to accessible URLs
    const userWithImageUrls = {
        _id: user._id,
        name: user.name,
        socialMediaHandle: user.socialMediaHandle,
        images: user.imagePaths.map(
            (imagePath) => `${req.protocol}://${req.get("host")}/${imagePath}`
        ),
    };

    res.status(200).json(userWithImageUrls);
});
