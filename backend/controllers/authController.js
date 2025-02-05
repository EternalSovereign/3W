const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
    const { email, username, password, role } = req.body;
    //if any is missing return error
    if (!email || !username || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (!role) {
        role = "user";
    }
    // Check if user already exists
    const userExists = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (userExists) {
        return res
            .status(400)
            .json({ message: "Email or username already taken" });
    }

    // Proceed with user registration
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        email: email,
        username: username,
        password: hashedPassword,
        role: role,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
});

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Please provide an username and password",
        });
    }
    const user = await User.findOne({ username }).exec();
    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }

    const accessToken = jwt.sign(
        {
            UserInfo: {
                UserId: user._id,
                UserName: user.username,
            },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        {
            UserInfo: {
                UserId: user._id,
                UserName: user.username,
            },
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: "7d" }
    );

    res.cookie("refreshCookie", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken: accessToken, role: user.role });
});

const refresh = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshCookie) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const refreshToken = cookie.jwt;
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        asyncHandler(async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden" });
            }
            const admin = await Admin.findById(
                decoded.AdminInfo.AdminId
            ).exec();
            if (!admin) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        UserId: user._id,
                        UserName: user.username,
                    },
                },
                process.env.ACCESS_TOKEN,
                { expiresIn: "15m" }
            );
            return res.status(200).json({ accessToken });
        })
    );
});

const logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshCookie) return res.sendStatus(204); //No content
    res.clearCookie("refreshCookie", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
    });

    return res.status(200).json({ message: "Cookie cleared" });
});

module.exports = { login, refresh, logout, register };
