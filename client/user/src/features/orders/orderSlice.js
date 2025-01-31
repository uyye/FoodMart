import {createSlice} from "@reduxjs/toolkit"
import instance from "../../api/axiosInstance"

const orderSlice = createSlice({
    name:"Orders",
    initialState:{
        orders:[],
        loading:false,
        error:null
    },
    reducers:{
        setOrder:(state, action)=>{
            state.orders = action.payload
        },
        setLoading:(state, action)=>{
          state.loading = action.payload
        },
        setError: (state, action)=>{
          state.error = action.payload
        }
    }
})

export const {setOrder, setLoading, setError} = orderSlice.actions


export const fetchOrder = ()=>{
    return async (dispatch)=>{
        try {
          dispatch(setLoading(true))
            const {data} = await instance({
                method:"get",
                url:"/orders",
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })
            dispatch(setOrder(data))
        } catch (error) {
            dispatch(setError(error))
        } finally{
          dispatch(setLoading(false))
        }
    }
}

export const handleNotificationPayment = (order_id, transaction_status)=>{
    return async (dispatch)=>{        
    try {
      await instance({
        method:"post",
        url:"/orders/webhook",
        data:{order_id, transaction_status},
        headers:{
            "Authorization": `bearer ${localStorage.getItem("access_token")}`
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export const fetchInputOrder = (products, contactUser, navigate)=>{
    
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"post",
                url:"/orders",
                data:{
                    products, 
                    addressShiping:contactUser.addressShiping,
                    phoneNumber:contactUser.phoneNumber
                },
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })
            

            console.log(data.newOrder.id," lanjutkan pembayaran");
            
             const payment = await instance({
                method:"post",
                url:"/orders/payment",
                data:{orderId:data.newOrder.id},
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
             })
            
             const token = payment.data.token
             console.log(token);

             
      window.snap.pay(token, {
        onSuccess: async (result) => {
          alert("Payment Success!");
          console.log(result);
          await dispatch (handleNotificationPayment(Number(result.order_id.split("-")[1]), result.transaction_status))
          navigate("/cart")
        },
        onPending: async (result) => {
          alert("Waiting for your payment!");
          console.log(result);
          await dispatch (handleNotificationPayment(Number(result.order_id.split("-")[1]), result.transaction_status))          

        },
        onError: async(result) => {
          alert("Payment Failed!");
          await dispatch (handleNotificationPayment(Number(result.order_id.split("-")[1]), result.transaction_status))          
        },
        onClose: () => {
          alert("You closed the popup without finishing the payment");
        },
      });
             
        } catch (error) {
            console.log(error); 
        }
    }
}


export default orderSlice.reducer