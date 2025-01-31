import {createSlice} from "@reduxjs/toolkit"
import instance from "../../api/axiosInstance"
import Swal from "sweetalert2"

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:{},
        status:"idle",
        error:null
    },
    reducers:{
        setCart:(state, action)=>{
            state.cart = action.payload
        },

        setPostCart:(state, action)=>{
            state.cart.CartItems.push(action.payload)
        },
        updateStatus:(state, action)=>{
            state.status = action.payload
        },
        setError:(state, action)=>{
            state.error = action.payload
        }
    }
})

export const {setCart, updateStatus, setError, setPostCart} = cartSlice.actions

export const fetchCart = ()=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:"/carts",
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })
            dispatch(setCart(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export const fetchInputCart = (productId, quantity, navigate)=>{
    return async(dispatch)=>{
        try {
            const {data} = await instance({
                method:"post",
                url:"/carts",
                data:{
                    productId,
                    quantity
                },
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type":"application/json"
                }
            })

            dispatch(setPostCart(data.cartItem))
            console.log(data.cartItem, "SLICE");
            
            
            Swal.fire({
                title:"Success",
                text:"Berhasil menambahkan produk ke keranjang",
                icon:"success",
                showConfirmButton:false,
                timer:2000
            })
            
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) {
                const result = await Swal.fire({
                    title:"Belum login?",
                    text:"Login untuk mulai berbelanja",
                    icon:"question",
                    showCancelButton: true,
                    confirmButtonText:"Login",
                    cancelButtonText:"Kembali"
                })

                if(result.isConfirmed){
                    navigate("/login")
                }
            }
        }
    }
}

export const updateCartQuantity =({productId, quantity})=>{
    return async(dispatch)=>{
        dispatch(updateStatus("loading"))
        try {
            const {data} = await instance({
                method:"put",
                url:"/carts",
                data:{productId, quantity},
                headers:{"Authorization":`Bearer ${localStorage.getItem("access_token")}`}
            })
            dispatch(updateStatus("succeeded"))
            console.log("MASUK");
            
        } catch (error) {
            console.log(error);
            dispatch(updateStatus("failed"))
            dispatch(setError(error.response?.data))
        }
    }
}

export default cartSlice.reducer