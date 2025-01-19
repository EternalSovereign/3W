const User = require("../models/userModel");
const asynchandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");

exports.handleFileUpload = asynchandler(async (req, res) => {
    // const { name, socialMediaHandle } = req.body;

    // // Find or create user
    // let user = await User.findOne({ name, socialMediaHandle });
    // if (!user) {
    //     user = new User({ name, socialMediaHandle, imagePaths: [] });
    //     await user.save();
    // }

    // // Ensure user's folder exists
    // const userFolder = path.join(__dirname, "../uploads", user._id.toString());
    // if (!fs.existsSync(userFolder)) {
    //     fs.mkdirSync(userFolder, { recursive: true });
    // }

    // // Move files to user's folder and save paths
    // const imagePaths = req.files.map((file) => {
    //     const dest = path.join(userFolder, file.filename);
    //     fs.renameSync(file.path, dest);
    //     return `uploads/${user._id}/${file.filename}`;
    // });

    // user.imagePaths.push(...imagePaths);
    // await user.save();

    // res.status(201).json({
    //     message: "User and images saved successfully!",
    //     user,
    // });
    const { name, socialMediaHandle } = req.body;
    let user = await User.findOne({ name, socialMediaHandle });
    if (!user) {
        user = new User({ name, socialMediaHandle, images: [] });
        await user.save();
    }
    const images = req.files.map((file) => file.buffer.toString("base64"));
    user.images.push(...images);
    await user.save();

    res.status(201).json({
        message: "User and images saved successfully",
        user: user,
    });
});
