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

            return res.data.addresses;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const deleteAddress = createAsyncThunk(
    "address/delete",
    async (id, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.user?.token;

            if (!token) {
                return rejectWithValue({ message: "Not authenticated" });
            }

            await axios.delete(`http://localhost:3000/address/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            toast.success("Address deleted");
            return id;
        } catch (err) {
            const errorPayload = err.response?.data || { message: err.message };
            toast.error("Failed to add address");
            return rejectWithValue(errorPayload);
        }
    }
);

export const updateAddress = createAsyncThunk(
    "address/update",
    async ({ id, formData }, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.user?.token;

            if (!token) {
                return rejectWithValue({ message: "Not authenticated" });
            }

            const res = await axios.put(`http://localhost:3000/address/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            toast.success("Address updated");
            return res.data.updatedAddress;
        } catch (err) {
            const errorPayload = err.response?.data || { message: err.message };
            toast.error("Failed to update address");
            return rejectWithValue(errorPayload);
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
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.addresses = state.addresses.filter((addr) => addr._id !== action.payload)
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                const updated = action.payload
                const index = state.addresses.findIndex(addr => addr._id == updated._id)
                if (index !== -1) {
                    state.addresses[index] = updated
                }
            })

    },
});

export const { clearAddresses } = addressSlice.actions;
export default addressSlice.reducer;
