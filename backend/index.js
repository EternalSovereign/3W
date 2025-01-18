const express = require("express");
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

const app = express();
connectDB();
const PORT = process.env.PORT || 8000;

mongoose.connection.once("open", () => {
    console.log("MongoDB connected successfully");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
