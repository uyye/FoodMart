import "./sideNavbar.css"
import { useEffect, useState } from "react"

// ICON
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaProductHunt } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { BsCartCheckFill } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataOrder, fetchOrderData, setShowAll } from "../../features/orderSlice";

const menuItems = [
    {icons:<IoHomeOutline size={30}/>, label:"Home", toGo:"/"},
    {icons:<FaProductHunt size={30}/>, label:"Product", toGo:"/product"},
    {icons:<LuUsers size={30}/>, label:"User", toGo:"/user"},
    {icons:<BsCartCheckFill size={30}/>, label:"Order", toGo:"/order"},
    // {icons:<GrTransaction size={30}/>, label:"Transaction", toGo:"/transaction"},
    
]

export default function SideNavbar() {
    const [open, setOpen] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const newOrder = useSelector((state)=> state.order.orders.filter((order)=>!order.isRead))

    const handleLogout = ()=>{
        localStorage.removeItem("access_token")
        navigate("/login")
    }

    const changePage = (route)=>{
        navigate(route)
    }

    useEffect(()=>{
        dispatch(fetchOrderData())
    }, [dispatch])

    return(
        <nav className={`sidebar ${open?"open":"closed"}`}>
            {/* HEADER */}
            <div className="header">
                <h1 className={`${open?"logoOpen":"logoClosed"}`}>MFD</h1>
                <MdMenuOpen
                size={34}
                className={`menuIcon ${!open && "menuIconClosed"}`}
                onClick={() => setOpen(!open)}
                />
            </div>

            {/* BODY */}
            <ul className="menuList">
                {menuItems.map((item, index)=>(
                    <li key={index} className="menuItem" onClick={()=>changePage(item.toGo)}>
                        <div>{item.icons}</div>
                        {open && <p className="menuLabel">{item.label}</p>}
                        {open && item.label === "Order" && <p className="badge">{newOrder.length}</p>}
                        {!open && <span className="tooltip">{item.label}</span>}
                    </li>
                ))}
            </ul>

            {/* FOOTER */}
            <div className="footer">
                <FaUserCircle size={30}/>
                {open && (
                    <div className="userInfo">
                        <p onClick={handleLogout}>Admin</p>
                    </div>
                )}
            </div>
        </nav>
    )
}