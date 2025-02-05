/*eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import Sidenav from "../components/Sidenav";
import Navbar from "../components/Navbar";
import Grids from "./Grids";
import { server } from "../../config/serverConfig";
import axios from "axios";

const validationSchema = yup.object({
    bankName: yup.string().required("Bank name is required"),
    branchName: yup.string().required("Branch name is required"),
    accountNumber: yup
        .string()
        .required("Account number is required")
        .matches(/^\d+$/, "Account number should be digits only"),
    accountHolderName: yup.string().required("Account holder name is required"),
    ifscCode: yup
        .string()
        .required("IFSC code is required")
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
});

const AddAccount = ({ onSubmit }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            bankName: "",
            branchName: "",
            accountNumber: "",
            accountHolderName: "",
            ifscCode: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSubmit(values);
            handleClose();
        },
    });

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
                sx={{
                    mt: 1,
                    width: "max-content",
                    alignSelf: "flex-end",
                }}
            >
                Add Bank Account
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Bank Account</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            margin="dense"
                            id="bankName"
                            name="bankName"
                            label="Bank Name"
                            type="text"
                            fullWidth
                            value={formik.values.bankName}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.bankName &&
                                Boolean(formik.errors.bankName)
                            }
                            helperText={
                                formik.touched.bankName &&
                                formik.errors.bankName
                            }
                        />
                        <TextField
                            margin="dense"
                            id="branchName"
                            name="branchName"
                            label="Branch Name"
                            type="text"
                            fullWidth
                            value={formik.values.branchName}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.branchName &&
                                Boolean(formik.errors.branchName)
                            }
                            helperText={
                                formik.touched.branchName &&
                                formik.errors.branchName
                            }
                        />
                        <TextField
                            margin="dense"
                            id="accountNumber"
                            name="accountNumber"
                            label="Account Number"
                            type="text"
                            fullWidth
                            value={formik.values.accountNumber}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.accountNumber &&
                                Boolean(formik.errors.accountNumber)
                            }
                            helperText={
                                formik.touched.accountNumber &&
                                formik.errors.accountNumber
                            }
                        />
                        <TextField
                            margin="dense"
                            id="accountHolderName"
                            name="accountHolderName"
                            label="Account Holder Name"
                            type="text"
                            fullWidth
                            value={formik.values.accountHolderName}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.accountHolderName &&
                                Boolean(formik.errors.accountHolderName)
                            }
                            helperText={
                                formik.touched.accountHolderName &&
                                formik.errors.accountHolderName
                            }
                        />
                        <TextField
                            margin="dense"
                            id="ifscCode"
                            name="ifscCode"
                            label="IFSC Code"
                            type="text"
                            fullWidth
                            value={formik.values.ifscCode}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.ifscCode &&
                                Boolean(formik.errors.ifscCode)
                            }
                            helperText={
                                formik.touched.ifscCode &&
                                formik.errors.ifscCode
                            }
                        />
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
AddAccount.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default AddAccount;
