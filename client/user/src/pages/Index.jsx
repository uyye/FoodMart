import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"
import "./Index.css"
import Footer from "../components/footer/Footer"

export default function Index() {
    return(
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}