import { createSlice } from "@reduxjs/toolkit";
import instance from "../api/axiosInstance";

const orderSlice = createSlice({
    name:"order",
    initialState:{
        orders:[],
        orderMontly:[],
        topOrder:[],
        orderDetail:[]
    },
    reducers:{
        setOrders:(state, action)=>{
            state.orders = action.payload
        },
        setOrderMontly:(state, action)=>{
            state.orderMontly = action.payload
        },
        setTopOrder:(state, action)=>{
            state.topOrder = action.payload
        },
        setOrderDetail:(state, action)=>{
            state.orderDetail = action.payload
        },
        resetOrderDetail:(state, action)=>{
            state.orderDetail = []
        }
    }
})

export const {setOrders, setOrderMontly, setTopOrder, setOrderDetail, resetOrderDetail} = orderSlice.actions

export const fetchDataOrder = ()=>{
    return async (dispatch) =>{
        try {
            const {data} = await instance({
                method:"get",
                url:"/orders/admin"
            })
            
            dispatch(setOrders(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchOrderMontly = ()=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:"/orders/current-month"
            })

            dispatch(setOrderMontly(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchTopOrder = ()=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:"/orders/top-order",
            })            

            dispatch(setTopOrder(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export const fetchOrderById = (orderId)=>{
    console.log(orderId, "SLICE"); //ini outpunya 23

    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:"/orders/detail",
                params:{orderId}
            })

            console.log(data, "DATA DETAIL ORDER DI SLICE");
            
            dispatch(setOrderDetail(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default orderSlice.reducer