import { useEffect } from "react"
import "../app.css"
import {useDispatch, useSelector} from "react-redux"
import { fetchDataUser, setPage, setSearch } from "../../features/userSlice"
import Search from "../../components/input/Search"
import DeleteButton from "../../components/button/DeleteButton"
import DetailButton from "../../components/button/DetailButton"

// ICON
import { BiDetail } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function User() {

    const dispatch = useDispatch()

    const {users, page, search} = useSelector((state)=>state.user) 

    console.log(search, "ISI DATA SEARCH PADA PAGE USER");
    
    const handlePageChange = (pageNumber)=>{
        dispatch(setPage(pageNumber))
    }

    const handleSearchChange = (keyword)=>{
        dispatch(setSearch(keyword))
    }

    useEffect(()=>{
        dispatch(fetchDataUser())
    },[dispatch, page, search])
    return(
        <div className="page-container">
            <h1>Manage User</h1>
            <Search value={search} handleSearch={(e)=>handleSearchChange(e.target.value)}/>
            <table className="table-column">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead> 
                <tbody>
                    {
                        users.length > 0?
                        users.map((user, index)=>
                            <tr key={index + 1}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td className="td-action">
                                    <DeleteButton><MdOutlineDeleteOutline size={20}/> Deleta</DeleteButton>
                                    <DetailButton toGO={`/detail/user/${user.id}`}> <BiDetail size={20}/> Detail</DetailButton>
                                </td>
                            </tr>
                        ):
                        <td colSpan={4}>Tidak ada data user</td>
                    }
                </tbody>
            </table>
        </div>
    )
}