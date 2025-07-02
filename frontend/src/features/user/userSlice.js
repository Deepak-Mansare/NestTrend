import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { fetchCartFromBackend } from "../cart/cartSlice";

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (formData, thunkApi) => {
        try {
            const res = await axios.post("http://localhost:3000/auth/register", formData);
            return res.data.message;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response.data.message || "Register failed");
        }
    }
)

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (formData, thunkApi) => {
        try {
            const res = await axios.post("http://localhost:3000/auth/login", formData);

            if (res.status !== 200 || !res.data.user) {
                return thunkApi.rejectWithValue(res.data.message || "Login failed");
            }

            localStorage.setItem("token", res.data.token);

            return res.data.user;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
)

export const loginUserAndSyncCart = (formData) => async (dispatch) => {
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
        await dispatch(fetchCartFromBackend());
    }
    return result;
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("persist:root");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = {
                    ...action.payload,
                    token: localStorage.getItem("token")
                };
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
