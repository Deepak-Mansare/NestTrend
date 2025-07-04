import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from "../../app/api";

export const getAllProducts = createAsyncThunk(
    'products/getAll',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().user?.user?.token;
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const res = await axios.get(`${API}/api/product/getProducts`, {
                headers,
            });
            return res.data.products;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
        }
    }
);

export const getProductById = createAsyncThunk(
    "products/getById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API}/api/product/getProduct/${id}`);
            return res.data.product;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch product");
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        loading: false,
        error: null,
        selectedProduct: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedProduct = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.selectedProduct = null;
            });
    },
});

export default productSlice.reducer;
