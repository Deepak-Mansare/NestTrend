import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async ({ products, addressId, totalPrice, token }, thunkApi) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/order/create",
                {
                    products,
                    shippingAddress: addressId,
                    totalPrice
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            return (await res).data.order
        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data.message)
        }
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        loading: false,
        error: null
    },
    reducers: {
        clearOrders: (state) => {
            state.orders = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false
                state.orders.push(action.payload)
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
