import {configureStore} from "@reduxjs/toolkit"
import productSlice from "../features/products/productSlice"
import cartSlice from "../features/cart/cartSlice"
import orderSlice from "../features/orders/orderSlice"

export const store = configureStore({
    reducer:{
        products:productSlice,
        cart:cartSlice,
        order:orderSlice
    }
})