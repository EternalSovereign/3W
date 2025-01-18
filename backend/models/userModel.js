const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    socialMediaHandle: { type: String, required: true },
    images: [{ type: String }], // Store filenames of uploaded images
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
