import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const addToCartBackend = createAsyncThunk(
    "cart/addToCartBackend",
    async (product, thunkApi) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/cart/add",
                {
                    productId: product._id,
                    quantity: 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    withCredentials: true
                }
            )
            return { product, quantity: 1 }
        } catch (err) {
            return thunkApi.rejectWithValue("Failed to add to cart", err)
        }
    }
)

export const fetchCartFromBackend = createAsyncThunk(
    "cart/fetchCartFromBackend",
    async (_, thunkApi) => {
        try {
            const res = await axios.get("http://localhost:3000/cart", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                withCredentials: true
            })

            const products = res.data.products || []
            return products.map((item) => ({
                product: item.productId,
                quantity: item.quantity
            }))
        } catch (err) {
            return thunkApi.rejectWithValue("Failed to load cart from backend", err)
        }
    }
)

const initialState = {
    items: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
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
        clearCartCompletely: (state) => {
            state.items = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartFromBackend.fulfilled, (state, action) => {
                state.items = action.payload
            })
            .addCase(addToCartBackend.fulfilled, (state, action) => {
                const { product, quantity } = action.payload
                const existingItem = state.items.find(
                    (item) => item.product._id === product._id
                )
                if (existingItem) {
                    existingItem.quantity += quantity
                } else {
                    state.items.push({ product, quantity })
                }
            })
    }
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, clearCartCompletely } = cartSlice.actions;
export default cartSlice.reducer;
