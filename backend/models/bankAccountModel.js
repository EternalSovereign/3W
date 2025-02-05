const mongoose = require("mongoose");

const BankAccountSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        bankName: { type: String, required: true },
        accountNumber: { type: String, required: true },
        accountHolderName: { type: String, required: true },
        branchName: { type: String, required: true },
        ifscCode: { type: String, required: true },
    },
    { timestamps: true }
);

const BankAccount = mongoose.model("BankAccount", BankAccountSchema);
module.exports = BankAccount;
