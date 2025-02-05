/* eslint-disable no-unused-vars */
import React from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    Grid2,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/user/index";
import { server } from "../../config/serverConfig";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${server}/login`,
                {
                    username: username,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                const data = response.data;
                dispatch(login(data));
                navigate("/home");
            }
        } catch (err) {
            console.log("Error logging in");
            console.log(err);
        }
    };
    return (
        <Container maxWidth="xs">
            <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
                <Avatar
                    sx={{
                        mx: "auto",
                        backgroundColor: "secondary.main",
                        mb: 1,
                        textAlign: "center",
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ textAlign: "center" }}
                >
                    Sign In
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        placeholder="Enter Username"
                        fullWidth
                        required
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        placeholder="Enter Password"
                        fullWidth
                        required
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1 }}
                    >
                        Sign In
                    </Button>
                </Box>
                <Grid2
                    container
                    justifyContent={"space-between"}
                    sx={{ mt: 1 }}
                >
                    <Grid2>
                        <Link component={RouterLink} to="/forget">
                            Forgot Password?
                        </Link>
                    </Grid2>
                    <Grid2>
                        <Link component={RouterLink} to="/register">
                            Sign up
                        </Link>
                    </Grid2>
                </Grid2>
            </Paper>
        </Container>
    );
};

export default Login;
