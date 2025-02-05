import React from "react";
import {
    Modal,
    Box,
    Typography,
    IconButton,
    Grid,
    Card,
    CardContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxHeight: "80%",
    overflowY: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const UserModal = ({ open, onClose, bankAccounts }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2">
                        Bank Accounts
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    {bankAccounts.map((account) => (
                        <Grid item xs={12} sm={6} md={4} key={account._id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">
                                        {account.bankName}
                                    </Typography>
                                    <Typography>
                                        Branch: {account.branchName}
                                    </Typography>
                                    <Typography>
                                        Account Number: {account.accountNumber}
                                    </Typography>
                                    <Typography>
                                        Account Holder:{" "}
                                        {account.accountHolderName}
                                    </Typography>
                                    <Typography>
                                        IFSC Code: {account.ifscCode}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Modal>
    );
};

UserModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    bankAccounts: PropTypes.array.isRequired,
};

export default UserModal;
