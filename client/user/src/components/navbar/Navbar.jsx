import "./Navbar.css";
import { useEffect, useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import { useSelector, useDispatch} from "react-redux";
import { fetchCart } from "../../features/cart/cartSlice";

export default function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const cart = useSelector((state)=>state.cart.cart)
    const totalCart = cart.CartItems?.length
    

    const handleLogOutButton = () => {
        localStorage.removeItem("access_token");
        navigate("/login");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isLoggedIn = !!localStorage.getItem("access_token");

    useEffect(()=>{
        dispatch(fetchCart())
    },[dispatch])

    return (
        <nav className="navbarContainer">
            <div className="logo">
                <Link to="/">
                    <h1>Manga</h1>
                </Link>
            </div>
            <ul className={`navbarMenus ${isMenuOpen ? "active" : ""}`}>
                    <Link to={"/"}><li>Home</li></Link>
                    <Link to={"/about"}><li>Tentang</li></Link>
                    <Link to={"/order"}><li>Pesanan saya</li></Link>
                
            </ul>
            <ul className="orderButton">
                {isLoggedIn && (
                    <li>
                        <div className="cartIcon" onClick={() => navigate("/cart")}>
                            <LuShoppingCart />
                            {totalCart > 0?
                             <span className="cartBadge">{totalCart}</span>:""
                            }
                        </div>

                        <span className="tooltip">Cart</span>
                    </li>
                )}
                {isLoggedIn ? (
                    <li onClick={handleLogOutButton}>
                        <IoLogOutSharp />
                        <span className="tooltip">Logout</span>
                    </li>
                ) : (
                    <li onClick={() => navigate("/login")}>
                        <IoMdLogIn />
                        <span className="tooltip">Login</span>
                    </li>
                )}
            </ul>
            <div className="hamburger" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav>
    );
}
