import { useDispatch, useSelector } from "react-redux"
import "./order.css"
import { useEffect } from "react"
import { fetchOrder } from "../../features/orders/orderSlice"
import OrderCard from "../../components/orderCard/OrderCard"

export default function Order() {
    const dispatch = useDispatch()
    const order = useSelector((state)=>state.order.orders)
    
    console.log(order);
    
    useEffect(()=>{
        dispatch(fetchOrder())
    },[])
    return(
        <div className="order-container">
            <div className="order-header">
                <h1>Order</h1>
                <p>Rabu, 07-januari-2025</p>
            </div>
            <div className="order-content">
                {
                    order.length > 0 ?
                    order.map((item, index)=>{
                        return(
                            <OrderCard order={item} key={index}/>
                        )
                    }):
                    ""
                }
            </div>
        </div>
    )
}