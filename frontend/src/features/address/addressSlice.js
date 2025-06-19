import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addresses: [],
};

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        addAddress: (state, action) => {
            state.addresses.push(action.payload);
        },
        clearAddresses: (state) => {
            state.addresses = [];
        },
    },
});

export const { addAddress, clearAddresses } = addressSlice.actions;
export default addressSlice.reducer;
