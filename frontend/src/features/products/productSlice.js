import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllProducts = createAsyncThunk(
    'products/getAll',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().user?.user?.token
            const headers = token ? { Authorization: `Bearer${token}` } : {}

            const res = await axios.get("http://localhost:3000/product/getProducts", {
                headers
            })
            return res.data.products
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products')
        }
    }
)

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllProducts.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            }).addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default productSlice.reducer