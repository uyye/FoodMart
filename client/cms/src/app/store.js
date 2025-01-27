import {configureStore} from "@reduxjs/toolkit"
import orderSlice from "../features/orderSlice"
import productSlice from "../features/productSlice"
import userSlice from "../features/userSlice"

export const store = configureStore({
    reducer:{
        order: orderSlice,
        product: productSlice,
        user:userSlice
    }
})