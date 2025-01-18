const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        socialMediaHandle: { type: String, required: true },
        imagePaths: [String],
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
