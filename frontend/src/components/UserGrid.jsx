import React, { useState, useEffect } from "react";
import { Box, Grid2, TextField, Typography } from "@mui/material";
import UserCard from "./UserCard";
import UserModal from "./UserModal";
import BankAccountCard from "./BankAccountCard";
import axios from "axios";
import { server } from "../../config/serverConfig";

export default function UserGrids() {
    const [users, setUsers] = useState([]);
    const [bankAccounts, setBankAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUserAccounts, setSelectedUserAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchUsers();
        fetchBankAccounts();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${server}/admin/users`, {
                withCredentials: true,
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBankAccounts = async () => {
        try {
            const response = await axios.get(`${server}/admin/bank-accounts`, {
                withCredentials: true,
            });
            setBankAccounts(response.data);
        } catch (error) {
            console.error("Error fetching bank accounts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUserClick = async (userId) => {
        try {
            const response = await axios.get(
                `${server}/admin/${userId}/bank-accounts`,
                {
                    withCredentials: true,
                }
            );
            setSelectedUserAccounts(response.data);
            setModalOpen(true);
        } catch (error) {
            console.error("Error fetching bank accounts:", error);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedUserAccounts([]);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredBankAccounts = bankAccounts.filter(
        (account) =>
            account.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.accountHolderName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

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
                pt: 1,
                pb: 3,
                pr: 3,
                pl: 3,
                mt: 9,

                display: "flex",
                flexDirection: "column",
            }}
        >
            <TextField
                label="Search Users and Bank Accounts"
                variant="outlined"
                margin="normal"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ alignSelf: "flex-end" }}
            />
            <Typography variant="h6" component="h2" sx={{ marginTop: 1 }}>
                Users
            </Typography>
            <Grid2 container sx={{ p: 2 }} spacing={{ xs: 2, sm: 3, md: 4 }}>
                {filteredUsers.map((user, index) => (
                    <Grid2 key={index} xs={12} sm={6} md={4}>
                        <UserCard {...user} onClick={handleUserClick} />
                    </Grid2>
                ))}
            </Grid2>
            <Typography variant="h6" component="h2" sx={{ marginTop: 1 }}>
                Bank Accounts
            </Typography>
            <Grid2 container sx={{ p: 2 }} spacing={{ xs: 2, sm: 3, md: 4 }}>
                {filteredBankAccounts.map((account, index) => (
                    <Grid2 key={index} xs={12} sm={6} md={4}>
                        <BankAccountCard {...account} editable={false} />
                    </Grid2>
                ))}
            </Grid2>
            <UserModal
                open={modalOpen}
                onClose={handleModalClose}
                bankAccounts={selectedUserAccounts}
                allBankAccounts={bankAccounts}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
            />
        </Box>
    );
}
