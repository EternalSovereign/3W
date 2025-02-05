import { createSlice } from "@reduxjs/toolkit";

export const sideToggleSlice = createSlice({
    name: "sideToggle",
    initialState: false,
    reducers: {
        toggle: (state) => !state,
    },
});

export const { toggle } = sideToggleSlice.actions;
export default sideToggleSlice.reducer;
