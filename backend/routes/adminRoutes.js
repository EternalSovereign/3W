const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const checkAdmin = require("../middleware/checkAdmin");
const verifyJWT = require("../middleware/verifyJWT");
const authRoutes = require("../routes/authRoutes");

router.use("/", authRoutes);
router.route("/users").get(verifyJWT, checkAdmin, adminController.getAllUsers);
router
    .route("/users/:id")
    .get(verifyJWT, checkAdmin, adminController.getUserById);

module.exports = router;
