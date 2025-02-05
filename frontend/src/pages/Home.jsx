import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidenav from "../components/Sidenav";
import Navbar from "../components/Navbar";
import Grids from "../components/Grids";

const Home = () => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    justifyContent: "start",
                }}
            >
                <Navbar />
                <Box sx={{ display: "flex" }}>
                    <Sidenav />
                    <Grids />
                </Box>
            </Box>
        </>
    );
};

export default Home;
