import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../app/api";

export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async ({ products, addressId, grandTotal, token }, thunkApi) => {
        try {
            const res = await axios.post(
                `${API}/order/create`,
                {
                    products,
                    shippingAddress: addressId,
                    totalPrice: grandTotal,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return res.data.order;
        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data.message);
        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearOrders: (state) => {
            state.orders = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
