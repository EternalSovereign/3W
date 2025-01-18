const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1].trim();
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, admin) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Forbidden" });
        }
        req.AdminID = admin.AdminInfo.AdminId;
        req.userName = admin.AdminInfo.AdminName;
        next();
    });
};

module.exports = verifyJWT;
