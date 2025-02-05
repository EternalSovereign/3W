const User = require("../models/userModel");
const BankAccount = require("../models/bankAccountModel");
const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const getBankAccounts = asynchandler(async (req, res) => {
    const userId = req.userId;
    const bankAccounts = await BankAccount.find({ user: userId });
    res.status(200).json(bankAccounts);
});

const createBankAccount = asynchandler(async (req, res) => {
    const { accountNumber, bankName, accountHolderName, branchName, ifscCode } =
        req.body;
    const user = req.userId;
    //if any is missing return error
    if (
        !accountNumber ||
        !bankName ||
        !accountHolderName ||
        !branchName ||
        !ifscCode
    ) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }
    //check for dplicate bank account
    const bankAccountExists = await BankAccount.findOne({
        accountNumber,
        bankName,
        user,
    });
    if (bankAccountExists) {
        return res.status(400).json({ message: "Bank account already exists" });
    }
    const newBankAccount = new BankAccount({
        accountNumber,
        bankName,
        accountHolderName,
        branchName,
        ifscCode,
        user,
    });

    await newBankAccount.save();
    res.status(201).json({ message: "Bank account created successfully" });
});

const updateBankAccount = asynchandler(async (req, res) => {
    const { accountNumber, bankName, accountHolderName, branchName, ifscCode } =
        req.body;
    //if any is missing return error
    if (
        !accountNumber ||
        !bankName ||
        !accountHolderName ||
        !branchName ||
        !ifscCode
    ) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }
    const bankAccountId = req.params.id;
    const bankAccount = await BankAccount.findById(bankAccountId);
    if (!bankAccount) {
        return res.status(404).json({ message: "Bank account not found" });
    }
    bankAccount.accountNumber = accountNumber;
    bankAccount.bankName = bankName;
    bankAccount.accountHolderName = accountHolderName;
    bankAccount.branchName = branchName;
    bankAccount.ifscCode = ifscCode;
    await bankAccount.save();
    res.status(200).json({ message: "Bank account updated successfully" });
});

const deleteBankAccount = asynchandler(async (req, res) => {
    const bankAccountId = req.params.id;
    const bankAccount = await BankAccount.findByIdAndDelete(bankAccountId);
    if (!bankAccount) {
        return res.status(404).json({ message: "Bank account not found" });
    }
    res.status(200).json({ message: "Bank account deleted successfully" });
});

module.exports = {
    getBankAccounts,
    createBankAccount,
    updateBankAccount,
    deleteBankAccount,
};
