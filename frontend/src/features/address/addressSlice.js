import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const addAddress = createAsyncThunk(
    "address/add",
    async (formData, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.user?.token;

            if (!token) {
                return rejectWithValue({ message: "Not authenticated" });
            }

            const res = await axios.post("http://localhost:3000/address/add", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            toast.success("Address added");
            return res.data.address;
        } catch (err) {
            const errorPayload = err.response?.data || { message: err.message };
            toast.error("Failed to add address");
            return rejectWithValue(errorPayload);
        }
    }
);

export const getAddresses = createAsyncThunk(
    "address/get",
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.user?.token;

            if (!token) {
                return rejectWithValue({ message: "Not authenticated" });
            }

            const res = await axios.get("http://localhost:3000/address", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            toast.success("Address fetched");
            return res.data.addresses;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const addressSlice = createSlice({
    name: "address",
    initialState: {
        addresses: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearAddresses: (state) => {
            state.addresses = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses.push(action.payload);
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAddresses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAddresses.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses = action.payload;
            })
            .addCase(getAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearAddresses } = addressSlice.actions;
export default addressSlice.reducer;
