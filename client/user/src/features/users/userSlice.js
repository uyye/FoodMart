import {createSlice} from '@reduxjs/toolkit'
import instance from '../../api/axiosInstance'

const userSlice = createSlice({
    name:'user',
    initialState:{
        totalUsers:0
    },
    reducers:{
        setTotalUsers:(state, action)=>{
            state.totalUsers = action.payload
        }
    }
})

export const {setTotalUsers} = userSlice.actions

export const fetchUsers = ()=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:'get',
                url:'/users',
            })

            dispatch(setTotalUsers(data.length))
        } catch (error) {
            console.log(error);
        }
    }
}

export default userSlice.reducer