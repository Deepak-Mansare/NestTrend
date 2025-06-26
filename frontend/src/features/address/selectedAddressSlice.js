import { createSlice } from "@reduxjs/toolkit";

const selectedAddressSlice = createSlice({
    name: "selectedAddress",
    initialState: { id: null },
    reducers: {
        setSelectedAddress: (state, action) => {
            state.id = action.payload
            localStorage.setItem("selectedAddressId", action.payload)
        },
        clearSelectedAddress: (state) => {
            state.id = null
            localStorage.removeItem("selectedAddressId")
        },
        loadSelectedAddressFromStorage: (state) => {
            const savedId = localStorage.getItem("selectedAddressId")
            if (savedId) state.id = savedId
        }
    }
})

export const {
    setSelectedAddress,
    clearSelectedAddress,
    loadSelectedAddressFromStorage
} = selectedAddressSlice.actions
export default selectedAddressSlice.reducer