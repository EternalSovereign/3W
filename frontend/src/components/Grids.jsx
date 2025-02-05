import React, { useState, useEffect } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import BankAccountCard from "./BankAccountCard";
import AddAccount from "./AddAccount";
import axios from "axios";
import { server } from "../../config/serverConfig";
export default function Grids() {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBankAccounts = async () => {
        try {
            const response = await axios.get(`${server}/user/bank-accounts`, {
                withCredentials: true,
            });
            setBankAccounts(response.data);
            // console.log("Bank accounts fetched successfully");
        } catch (error) {
            console.error("Error fetching bank accounts:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchBankAccounts();
    }, []);

    const handleEdit = async (updatedAccount) => {
        try {
            const response = await axios.patch(
                `${server}/user/bank-accounts/${updatedAccount._id}`,
                updatedAccount,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                //console.log("Bank account updated successfully");
                setBankAccounts(
                    bankAccounts.map((account) =>
                        account._id === updatedAccount._id
                            ? updatedAccount
                            : account
                    )
                );
            }
        } catch (error) {
            console.error("Error updating bank account:", error);
        }
    };

    const handleDelete = async (_id) => {
        try {
            const response = await axios.delete(
                `${server}/user/bank-accounts/${_id}`,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                setBankAccounts(
                    bankAccounts.filter((account) => account._id !== _id)
                );
                //console.log("Bank account deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting bank account:", error);
        }
    };
    const handleAddAccount = async (newAccount) => {
        try {
            const response = await axios.post(
                `${server}/user/bank-accounts`,
                newAccount,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 201) {
                fetchBankAccounts();
            }
        } catch (error) {
            console.error("Error adding bank account:", error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ flexGrow: 1, mt: 15 }}>
                <Typography variant="h5" align="center">
                    Loading...
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                pt: 1,
                pb: 3,
                pr: 3,
                pl: 3,
                mt: 9,
            }}
        >
            <AddAccount onSubmit={handleAddAccount} />
            <Grid2 container sx={{ p: 3 }} spacing={{ xs: 2, sm: 3, md: 4 }}>
                {bankAccounts.map((account, index) => (
                    <Grid2 key={index} xs={12} sm={6} md={4}>
                        <BankAccountCard
                            {...account}
                            editable={true}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
}
