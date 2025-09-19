import {createSlice} from "@reduxjs/toolkit"
import instance from "../api/axiosInstance"

const userSlice = createSlice({
    name:"users",
    initialState:{
        users:[],
        page:1,
        search:"",
        user:{},
        totalUsers:0
    },
    reducers:{
        setUsers:(state, action)=>{
            console.log(action.payload.length, "<---CEK TOTAL USER")
            state.users = action.payload
            state.totalUsers = action.payload.length
        },
        setPage:(state, action)=>{
            state.page = action.payload
        },
        setSearch:(state, action)=>{
            state.search = action.payload
        },
        setUser:(state, action)=>{
            state.user = action.payload
        },
        setDeleteUser:(state, action)=>{
            state.users = state.users.filter(user => user.id !== action.payload)
        },
        setAddUser:(state, action)=>{
            state.users.push(action.payload)
        }
        
    }
})

export const {setUsers, setPage, setSearch, setUser, setDeleteUser, setAddUser} = userSlice.actions 

export const fetchDataUser = ()=>{
    return async(dispatch, getState)=>{
        const {page, search} = getState().user
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

export const fetchDeleteUser = (id)=>{
    return async (dispatch)=>{
        try {
            await instance({
                method:"delete",
                url:`/users/delete/${id}`,
                headers:{"Authorization":`bearer ${localStorage.getItem("access_token")}`}
            })

            dispatch(setDeleteUser(id))
        } catch (error) {
            console.log(error);
            
        }
    }
}


export default userSlice.reducer