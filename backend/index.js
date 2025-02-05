const express = require("express");
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

const PORT = process.env.PORT || 8000;

app.use("/", authRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

mongoose.connection.once("open", () => {
    console.log("MongoDB connected successfully");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
