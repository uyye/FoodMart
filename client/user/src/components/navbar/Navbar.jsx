import "./Navbar.css";
import { useEffect, useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../features/cart/cartSlice";

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const token = localStorage.getItem("access_token");

    const cart = useSelector((state) => state.cart.cart);
    const totalCart = cart?.CartItems?.length || 0;

    const handleLogOutButton = () => {
        localStorage.removeItem("access_token");
        navigate("/login");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isLoggedIn = !!localStorage.getItem("access_token");

    useEffect(() => {
        if (token) {
            dispatch(fetchCart());
        }
    }, [dispatch, totalCart]);

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link to="/"><h1 style={{color:'#ffff'}}>MFD</h1></Link>
            </div>

            <ul className={`navbar__menus ${isMenuOpen ? "active" : ""}`}>
                <Link to="/"><li>Home</li></Link>
                <Link to="/about"><li>About</li></Link>
                <Link to="/order"><li>Orders</li></Link>

                    {isLoggedIn && (
                        <li>
                            <div className="navbar__cart" onClick={() => navigate("/cart")}>
                                Cart
                                {totalCart > 0 && <span className="navbar__badge">{totalCart}</span>}
                            </div>
                        </li>
                    )}
                    {isLoggedIn ? (
                        <li style={{cursor:'pointer'}} onClick={handleLogOutButton}>
                            Logout
                        </li>
                    ) : (
                        <li style={{cursor:'pointer'}} onClick={() => navigate("/login")}>
                            Login
                        </li>
                    )}
            </ul>

            <div className={`navbar__hamburger ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav>
    );
}
