//eslint-disable-next-line
import React from "react";
import Sidenav from "../components/Sidenav";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import UserGrid from "../components/UserGrid";

const Users = () => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Navbar />
                <Box sx={{ display: "flex", overflow: "auto" }}>
                    <Sidenav />
                    <UserGrid />
                </Box>
            </Box>
        </>
    );
};

export default Users;
