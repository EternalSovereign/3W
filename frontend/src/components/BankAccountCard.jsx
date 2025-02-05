import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";

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

const BankAccountCard = ({
    _id,
    bankName,
    branchName,
    accountNumber,
    accountHolderName,
    ifscCode,
    onEdit,
    onDelete,
    editable,
}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            bankName: bankName,
            branchName: branchName,
            accountNumber: accountNumber,
            accountHolderName: accountHolderName,
            ifscCode: ifscCode,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onEdit({ ...values, _id });
            handleClose();
        },
    });

    return (
        <>
            <Card sx={{ minWidth: 275, margin: "10px" }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        {bankName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Branch: {branchName}
                    </Typography>
                    <Typography variant="body2">
                        Account Number: {accountNumber}
                    </Typography>
                    <Typography variant="body2">
                        Account Holder: {accountHolderName}
                    </Typography>
                    <Typography variant="body2">
                        IFSC Code: {ifscCode}
                    </Typography>
                </CardContent>
                {editable ? (
                    <CardActions>
                        <Button size="small" onClick={handleClickOpen}>
                            Edit
                        </Button>
                        <Button size="small" onClick={() => onDelete(_id)}>
                            Delete
                        </Button>
                    </CardActions>
                ) : null}
            </Card>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Bank Account</DialogTitle>
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

BankAccountCard.propTypes = {
    _id: PropTypes.string.isRequired,
    bankName: PropTypes.string.isRequired,
    branchName: PropTypes.string.isRequired,
    accountNumber: PropTypes.string.isRequired,
    accountHolderName: PropTypes.string.isRequired,
    ifscCode: PropTypes.string.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    editable: PropTypes.bool,
};

export default BankAccountCard;
