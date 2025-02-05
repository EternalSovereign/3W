import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLogged: false,
        accesToken: null,
        role: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLogged = true;
            state.accesToken = action.payload.accesToken;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.isLogged = false;
            state.accesToken = null;
            state.role = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
