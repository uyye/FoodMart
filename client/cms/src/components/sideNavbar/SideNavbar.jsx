import "./sideNavbar.css"
import { useState } from "react"

// ICON
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaProductHunt } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { BsCartCheckFill } from "react-icons/bs";

const menuItems = [
    {icons:<IoHomeOutline size={30}/>, label:"Home", toGo:"/"},
    {icons:<FaProductHunt size={30}/>, label:"Product", toGo:"/product"},
    {icons:<LuUsers size={30}/>, label:"User", toGo:"/user"},
    // {icons:<BsCartCheckFill size={30}/>, label:"Order", toGo:"/order"},
    
]

export default function SideNavbar() {
    const [open, setOpen] = useState(true)
    const navigate = useNavigate()

    const changePage = (route)=>{
        navigate(route)
    }

    return(
        <nav className={`sidebar ${open?"open":"closed"}`}>
            {/* HEADER */}
            <div className="header">
                <img src="" alt="logo" className={`${open?"logoOpen":"logoClosed"}`} />
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
                        {!open && <span className="tooltip">{item.label}</span>}
                    </li>
                ))}
            </ul>

            {/* FOOTER */}
            <div className="footer">
                <FaUserCircle size={30}/>
                {open && (
                    <div className="userInfo">
                        <p>Admin</p>
                    </div>
                )}
            </div>
        </nav>
    )
}