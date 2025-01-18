const Admin = require("../models/adminModel");

const checkAdmin = async (req, res, next) => {
    const requestAdminID = req.AdminID;
    if (!requestAdminID) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { role } = await Admin.findOne(
        { _id: requestAdminID },
        { role: 1 }
    ).lean();
    console.log;
    if (!role || role !== "admin") {
        return res.status(403).json({ message: "You are not authorized" });
    }
    next();
};

module.exports = checkAdmin;
