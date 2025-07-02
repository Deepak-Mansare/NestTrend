import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCartBackend = createAsyncThunk(
    "cart/addToCartBackend",
    async (product, thunkApi) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/cart/add",
                {
                    productId: product._id,
                    quantity: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            return res.data.cart.products
                .map((item) => {
                    const product = item.productId;
                    if (!product || typeof product !== "object") return null;
                    return { product, quantity: item.quantity };
                })
                .filter(Boolean);
        } catch (err) {
            return thunkApi.rejectWithValue("Failed to add to cart", err);
        }
    }
);

export const fetchCartFromBackend = createAsyncThunk(
    "cart/fetchCartFromBackend",
    async (_, thunkApi) => {
        try {
            const res = await axios.get("http://localhost:3000/cart", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            return res.data.products
                .map((item) => {
                    const product = item.productId;
                    if (!product || typeof product !== "object") return null;
                    return { product, quantity: item.quantity };
                })
                .filter(Boolean);
        } catch (err) {
            return thunkApi.rejectWithValue("Failed to load cart from backend", err);
        }
    }
);

export const updateCartQuantityBackend = createAsyncThunk(
    "cart/updateCartQuantityBackend",
    async ({ productId, quantity }, thunkApi) => {
        try {
            const res = await axios.put(
                `http://localhost:3000/cart/update/${productId}`,
                { quantity },
                {
                    headers:
                        { Authorization: `Bearer ${localStorage.getItem("token")}` }
                }
            )

            return res.data.cart.products
                .map((item) => {
                    const product = item.productId
                    if (!product || typeof product !== "object") return null
                    return { product, quantity: item.quantity }
                })
                .filter(Boolean)
        }
        catch (err) {
            console.log(err)
            return thunkApi.rejectWithValue("Failed to update cart quantity")
        }
    }
)

export const clearCartFromBackend = createAsyncThunk(
    "cart/clearCartFromBackend",
    async (_, thunkApi) => {
        try {
            await axios.delete("http://localhost:3000/cart/clear", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return true;
        } catch (err) {
            return thunkApi.rejectWithValue("Failed to clear cart from backend", err);
        }
    }
);

export const removeFromCartBackend = createAsyncThunk(
    "cart/removeFromCartBackend",
    async (productId, thunkApi) => {
        try {
            await axios.delete(`http://localhost:3000/cart/remove/${productId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return productId;
        } catch (err) {
            return thunkApi.rejectWithValue("Failed to remove product from backend", err);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        clearCart: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartFromBackend.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addToCartBackend.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(updateCartQuantityBackend.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(removeFromCartBackend.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (item) => item.product._id !== action.payload
                );
            });
    },
});

export const {
    removeFromCart,
    clearCart,
    clearCartCompletely,
} = cartSlice.actions;

export default cartSlice.reducer;
