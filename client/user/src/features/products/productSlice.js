import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";

const productSlice = createSlice({
    name:"products",
    initialState:{
        products:[],
        totalItems:0,
        page:1,
        sort:"ASC",
        filter:"",
        search:"",
        loading:false,
        error:null
    },
    reducers:{
        setProducts :(state, action)=>{
            state.products = action.payload.products
            state.totalItems = action.payload.totalItems
        },
        setPage: (state, action)=>{
            state.page = action.payload
        },
        setSort: (state, action)=>{
            state.sort = action.payload
        },
        setFilter: (state, action)=>{
            state.filter = action.payload
        },
        setSearch: (state, action)=>{
            state.search = action.payload
        },
        setLoading:(state, action)=>{
            state.loading = action.payload
        },
        setError:(state, action)=>{
            state.error = action.payload
        }
    }
})

export const {setProducts, setPage, setSort, setFilter, setSearch, setLoading, setError} = productSlice.actions
export const fetchProducts = ()=>{
    return async (dispatch, getState)=>{
        const {page, sort, filter, search} = getState().products  
        try {  
            dispatch(setLoading(true))      
            const {data} = await instance({
                method:"get",
                url:`/products`,
                params:{
                    page,
                    sort,
                    filter,
                    search
                }
            })
            dispatch(setProducts({products:data.products, totalItems:data.totalItems}))
        } catch (error) {
            dispatch(setError(error))
        } finally{
            dispatch(setLoading(false))
        }
    }
}

export default productSlice.reducer