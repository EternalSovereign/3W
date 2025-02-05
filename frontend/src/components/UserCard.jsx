import React from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import PropTypes from "prop-types";

const UserCard = ({ _id, username, email, onClick }) => {
    return (
        <Card sx={{ minWidth: 275, margin: "10px" }}>
            <CardActionArea onClick={() => onClick(_id)}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        {username}
                    </Typography>
                    <Typography variant="body2">Email: {email}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

UserCard.propTypes = {
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default UserCard;
