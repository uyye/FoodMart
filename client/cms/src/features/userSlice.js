import {createSlice} from "@reduxjs/toolkit"
import instance from "../api/axiosInstance"

const userSlice = createSlice({
    name:"users",
    initialState:{
        users:[],
        page:1,
        search:"",
        user:{}
    },
    reducers:{
        setUsers:(state, action)=>{
            state.users = action.payload
        },
        setPage:(state, action)=>{
            state.page = action.payload
        },
        setSearch:(state, action)=>{
            state.search = action.payload
        },
        setUser:(state, action)=>{
            state.user = action.payload
        }
        
    }
})

export const {setUsers, setPage, setSearch, setUser} = userSlice.actions 

export const fetchDataUser = ()=>{
    return async(dispatch, getState)=>{

        const {page, search} = getState().user
        
        console.log(search, "DIDALAM SEARCH");
        
        try {
            const {data} = await instance({
                method:"get",
                url:"/users",
                params:{
                    page,
                    search
                }
            })   
                        
            dispatch(setUsers(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export const fetchUserById = (id)=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:`/users/profile/${id}`
            })
            dispatch(setUser(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}


export default userSlice.reducer