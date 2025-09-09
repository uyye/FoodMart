import {configureStore} from "@reduxjs/toolkit"
import productSlice from "../features/products/productSlice"
import cartSlice from "../features/cart/cartSlice"
import orderSlice from "../features/orders/orderSlice"
import userSlice from "../features/users/userSlice"

export const store = configureStore({
    reducer:{
        products:productSlice,
        cart:cartSlice,
        order:orderSlice,
        users:userSlice,
    }
})