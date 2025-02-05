const express = require("express");
const router = express.Router();
const {
    updateBankAccount,
    createBankAccount,
    deleteBankAccount,
    getBankAccounts,
} = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");

router
    .route("/bank-accounts")
    .get(verifyJWT, getBankAccounts)
    .post(verifyJWT, createBankAccount);

router
    .route("/bank-accounts/:id")
    .patch(verifyJWT, updateBankAccount)
    .delete(verifyJWT, deleteBankAccount);

module.exports = router;
