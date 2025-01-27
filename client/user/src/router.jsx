import {createBrowserRouter} from "react-router-dom"
import Index from "./pages/Index"
import Home from "./pages/home/Home"
import DetailProduct from "./pages/product/DetailProduct"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Cart from "./pages/cart/Cart"
import Checkout from "./pages/checkout/Checkout"
import About from "./pages/about/About"
import Order from "./pages/order/Order"


const router = createBrowserRouter([
    {
        path:"/",
        element:<Index/>,
        children:[
            {path:"", element:<Home/>},
            {path:"product/:id", element:<DetailProduct/>},
            {path:"cart", element:<Cart/>},
            {path:"checkout", element:<Checkout/>},
            {path:"about", element:<About/>},
            {path:"order", element:<Order/>},
        ]
        
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
],
{
    future:{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    }
})

export default router