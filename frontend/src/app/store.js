import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"

import userReducer from "../features/user/userSlice"
import cartReducer from "../features/cart/cartSlice"
import productReducer from "../features/products/productSlice"
import addressReducer from "../features/address/addressSlice"
import orderReducer from "../features/orders/orderSlice"
import selectedAddressReducer from "../features/address/selectedAddressSlice"

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['user', 'cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    address: addressReducer,
    orders: orderReducer,
    selectedAddress: selectedAddressReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
})

export const persistor = persistStore(store)