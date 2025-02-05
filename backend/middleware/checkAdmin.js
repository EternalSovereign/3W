const User = require("../models/userModel");

const checkAdmin = async (req, res, next) => {
    const requestUserId = req.userId;
    if (!requestUserId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { role } = await User.findOne(
        { _id: requestUserId },
        { role: 1 }
    ).lean();
    if (!role || role !== "admin") {
        return res.status(403).json({ message: "You are not authorized" });
    }
    next();
};

module.exports = checkAdmin;
