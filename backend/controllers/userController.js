const User = require("../models/userModel");

exports.submitForm = async (req, res) => {
    try {
        const { name, socialMediaHandle } = req.body;
        const images = req.files.map((file) => file.filename);

        const newUser = new User({ name, socialMediaHandle, images });
        await newUser.save();

        res.status(201).json({ message: "User submitted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
