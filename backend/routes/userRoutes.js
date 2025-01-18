const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const userController = require("../controllers/userController.js");

router.post("/submit", upload.array("images", 10), userController.submitForm);

module.exports = router;
