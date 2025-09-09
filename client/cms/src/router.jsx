import {createBrowserRouter, redirect} from "react-router"
import Index from "./pages/Index"
import Home from "./pages/Home/Home"
import Product from "./pages/Product/Product"
import User from "./pages/User/User"
import Detailuser from "./pages/DetailUser/DetailUser"
import Order from "./pages/Order/Order"
import Transaction from "./pages/Transaction/Transaction"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import DetailOrder from "./pages/Order/DetailOrder"

const router = createBrowserRouter([
    {
        path:"/",
        element:<Index/>,
        loader:()=>{
            const token = localStorage.getItem("access_token")
            if(!token){
                return redirect("/login")
            }
            return null
        },
        children:[
            {path:"/", element:<Home/>},
            {path:"/product", element:<Product/>},
            {path:"/user", element:<User/>},
            {path:"/detail/user/:id", element:<Detailuser/>},
            {path:"/order", element:<Order/>},
            {path:"/order/detail", element:<DetailOrder/>},
            {path:"/transaction", element:<Transaction/>}
        ],
    },
    {path:"/login", element:<Login/>},
    {path:"/register", element:<Register/>}
])

export default router