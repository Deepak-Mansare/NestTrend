import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (formData, thunkApi) => {
        try {
            const res = await axios.post("http://localhost:3000/auth/register", formData, {
                withCredentials: true
            })
            return res.data.user
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response.data.message || "Register failed")
        }
    }
)

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (formData, thunkApi) => {
        try {
            const res = await axios.post("http://localhost:3000/auth/login", formData, {
                withCredentials: true
            })
            return res.data.user
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response.data.message || "Login failed")
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {
        logoutUser: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
