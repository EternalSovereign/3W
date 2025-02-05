const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const BankAccount = require("../models/bankAccountModel");
const mongoose = require("mongoose");

const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find().select("username _id email");
    res.status(200).json(users);
});

const getAllBankAccounts = expressAsyncHandler(async (req, res) => {
    const bankAccounts = await BankAccount.find().select(
        "user accountNumber bankName accountHolderName branchName ifscCode"
    );
    res.status(200).json(bankAccounts);
});

const getUserById = expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId).select("username email");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
});

const getBankAccountByUserID = expressAsyncHandler(async (req, res) => {
    const user = req.params.id;
    const bankAccount = await BankAccount.find({ user: user });
    if (!bankAccount) {
        return res.status(404).json({ message: "Bank account not found" });
    }
    res.status(200).json(bankAccount);
});

module.exports = {
    getAllUsers,
    getAllBankAccounts,
    getUserById,
    getBankAccountByUserID,
};
