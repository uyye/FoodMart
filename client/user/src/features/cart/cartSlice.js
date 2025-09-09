import {createSlice} from "@reduxjs/toolkit"
import instance from "../../api/axiosInstance"
import Swal from "sweetalert2"

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:{},
        status:"idle",
        error:null,
        loading:false
    },
    reducers:{
        setCart:(state, action)=>{
            state.cart = action.payload
        },
        setPostCart:(state, action)=>{
            // console.log(state.cart.CartItems.length, "SEBELUM PUSH CART");
            state.cart.CartItems.push(action.payload)
            // console.log(state.cart.CartItems.length, "SEBELUM SETELAH CART");
        },
        setUpdateQuantity:(state, action)=>{
            const updatedItem = action.payload.cartItem
            state.cart.CartItems?.filter((item)=>item.id === updatedItem.id)


        },
        updateStatus:(state, action)=>{
            state.status = action.payload
        },
        setError:(state, action)=>{
            state.error = action.payload
        },
        setLoading:(state, action)=>{
            state.loading = action.payload
        }
    }
})

export const {setCart, updateStatus, setError, setPostCart, setUpdateQuantity, setLoading} = cartSlice.actions

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
            console.log(data, "SETELAH UPDATE QUANTITY");
            dispatch(setUpdateQuantity(data))
            dispatch(updateStatus("succeeded"))            
        } catch (error) {
            console.log(error);
            dispatch(updateStatus("failed"))
            dispatch(setError(error.response?.data))
        }
    }
}

export const fetchDeleteCartByProductId = (productId)=>{
    return async (dispatch)=>{
        try {
            dispatch(setLoading(true))
            const deleteCart = await instance({
                method:'delete',
                url:`/carts/item/${productId}`,
                headers:{
                    "Content-Type":'aplication/json',
                    "Authorization":`Bearer ${localStorage.getItem('access_token')}`
                }
            })
            dispatch(fetchCart())
            
        } catch (error) {
            console.log(error);
        } finally{
            dispatch(setLoading(false))
        }
    }
}

export default cartSlice.reducer