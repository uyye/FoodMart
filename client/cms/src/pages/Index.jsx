import { Outlet } from "react-router";
import "./index.css"
import SideNavbar from "../components/sideNavbar/SideNavbar";

export default function Index() {
    return(
        <div className="container">
            <SideNavbar/>
            <Outlet/>
        </div>
    )
}