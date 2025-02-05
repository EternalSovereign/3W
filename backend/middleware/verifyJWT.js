const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const cookies = req.cookies;
    const refreshCookie = cookies.refreshCookie;
    if (authHeader) {
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader.split(" ")[1].trim();
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(403).json({ message: "Forbidden" });
            }
            req.userId = user.UserInfo.UserId;
            req.userName = user.UserInfo.UserName;
            next();
        });
    } else if (refreshCookie) {
        jwt.verify(refreshCookie, process.env.REFRESH_TOKEN, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden" });
            }
            req.userId = user.UserInfo.UserId;
            req.userName = user.UserInfo.UserName;
            next();
        });
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = verifyJWT;
