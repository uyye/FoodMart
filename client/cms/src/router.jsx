import {createBrowserRouter, redirect} from "react-router"
import Index from "./pages/Index"
import Home from "./pages/Home/Home"
import Product from "./pages/Product/Product"
import User from "./pages/User/User"
import Detailuser from "./pages/DetailUser/DetailUser"

const router = createBrowserRouter([
    {
        path:"/",
        element:<Index/>,
        // loader:()=>{
        //     const token = localStorage.getItem("access_token")
        //     if(!token){
        //         return redirect("/login")
        //     }
        //     return null
        // },
        children:[
            {path:"/", element:<Home/>},
            {path:"/product", element:<Product/>},
            {path:"/user", element:<User/>},
            {path:"/detail/user/:id", element:<Detailuser/>}
        ],
    },
    {path:"/login", element:""},
    {path:"/register", element:""}
])

export default router