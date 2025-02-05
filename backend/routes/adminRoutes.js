const express = require("express");
const router = express.Router();
const {
    getAllBankAccounts,
    getAllUsers,
    getBankAccountByUserID,
    getUserById,
} = require("../controllers/adminController");
const checkAdmin = require("../middleware/checkAdmin");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/users").get(verifyJWT, checkAdmin, getAllUsers);
router.route("/users/:id").get(verifyJWT, checkAdmin, getUserById);
router.route("/bank-accounts").get(verifyJWT, checkAdmin, getAllBankAccounts);
router
    .route("/:id/bank-accounts")
    .get(verifyJWT, checkAdmin, getBankAccountByUserID);

module.exports = router;
