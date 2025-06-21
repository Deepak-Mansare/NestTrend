import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload
            const existingItem = (state.items || []).find(item => item.product._id === product._id)

            console.log("cart before", JSON.parse(JSON.stringify(state.items)));

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({ product, quantity: 1 })
            }

            console.log("cart after", JSON.parse(JSON.stringify(state.items)));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.product._id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item.product._id === action.payload)
            if (item) item.quantity += 1
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(item => item.product._id === action.payload)
            if (item && item.quantity > 1) item.quantity -= 1
        },
    },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
