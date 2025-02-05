import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    Link,
    Paper,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    TextField,
    Typography,
    Grid2,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { server } from "../../config/serverConfig";

const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password should be of minimum 6 characters length"),
    role: yup.string().required("Role is required"),
});

const Signup = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            role: "user", // Default role
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${server}/register`, values);
                if (response.status === 201) {
                    navigate("/login");
                }
            } catch (error) {
                console.log("Signup failed", error);
            }
        },
    });

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
                    Sign Up
                </Typography>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        placeholder="Enter Username"
                        fullWidth
                        required
                        autoFocus
                        id="username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.username &&
                            Boolean(formik.errors.username)
                        }
                        helperText={
                            formik.touched.username && formik.errors.username
                        }
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        placeholder="Enter Email"
                        fullWidth
                        required
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        placeholder="Enter Password"
                        fullWidth
                        required
                        type="password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                        sx={{ mb: 2 }}
                    />
                    <FormControl component="fieldset" sx={{ mb: 2 }}>
                        <FormLabel component="legend">Role</FormLabel>
                        <RadioGroup
                            aria-label="role"
                            name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel
                                value="user"
                                control={<Radio />}
                                label="User"
                            />
                            <FormControlLabel
                                value="admin"
                                control={<Radio />}
                                label="Admin"
                            />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1 }}
                    >
                        Sign Up
                    </Button>
                </Box>
                <Grid2
                    container
                    justifyContent={"space-between"}
                    sx={{ mt: 1 }}
                >
                    <Grid2>
                        <Link component={RouterLink} to="/login">
                            Already have an account? Sign in
                        </Link>
                    </Grid2>
                </Grid2>
            </Paper>
        </Container>
    );
};

export default Signup;
