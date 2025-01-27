import { createSlice } from "@reduxjs/toolkit";
import instance from "../api/axiosInstance";

const productSlice = createSlice({
    name:"products",
    initialState:{
        products:[],
        totalItems:0,
        page:1,
        sort:"ASC",
        filter:"",
        search:"",
        detailProduct:{}
    },
    reducers:{
        setProducts:(state, action)=>{
            state.products = action.payload.products
            state.totalItems = action.payload.totalItems
        },
        setPage:(state, action)=>{
            state.page = action.payload
        },
        setFilter:(state, action)=>{
            state.filter = action.payload
        },
        setSearch:(state, action)=>{
            state.search = action.payload
        },
        setSort:(state, action)=>{
            state.sort = action.payload
        },
        setDetailProduct:(state, action)=>{
            state.detailProduct = action.payload
        }
    }
})

export const {setProducts, setPage, setFilter, setSearch, setSort, setDetailProduct} = productSlice.actions

export const fetchDataProduct = ()=>{    
    return async (dispatch, getState)=>{
        const {page, sort, filter, search} = getState().product
        try {
            const {data} = await instance({
                method:"get",
                url:"/products",
                params:{
                    page,
                    sort,
                    filter,
                    search
                }
            })
            
            dispatch(setProducts({products:data.products, totalItems:data.totalItems}))
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchDetailProduct = (id)=>{
    return async (dispatch)=>{
        try {
         const {data} = await instance({
            method:"get",
            url:`/products/${id}`
         }) 
         
         dispatch(setDetailProduct(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export const fetchInputProduct = (product)=>{
    return async(dispatch)=>{
        try {
            const {data} = await instance({
                method:"post",
                url:"/products",
                data:product
            })

            dispatch(fetchDataProduct())
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchUpdateProduct = (product, id)=>{
    console.log("MASUK UPDATE");
    
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"put",
                url:`/products/${id}`,
                data:product
            })

            dispatch(fetchDataProduct())
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchDeleteProduct = (id)=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"delete",
                url:`/products/${id}`
            })

            dispatch(fetchDataProduct())
        } catch (error) {
            console.log(error);
            
        }
    }
}


export default productSlice.reducer