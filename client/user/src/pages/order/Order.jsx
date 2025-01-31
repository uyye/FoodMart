import { useDispatch, useSelector } from "react-redux"
import "./order.css"
import { useEffect } from "react"
import { fetchOrder } from "../../features/orders/orderSlice"
import OrderCard from "../../components/orderCard/OrderCard"
import formateDate from "../../helpers/formateDate"
import {ColorRing} from "react-loader-spinner"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"


export default function Order() {
    const dispatch = useDispatch()
    const {orders, loading, error} = useSelector((state)=>state.order)
    const navigate = useNavigate()
    const token = localStorage.getItem("access_token")
    
    
    useEffect(()=>{
        if(token){
            dispatch(fetchOrder())
        }else{
            (async () => {
                const result = await Swal.fire({
                    title: "Belum Login?",
                    text: "Login untuk memulai pesanan",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Login",
                    cancelButtonText: "Cancel"
                });
    
                if (result.isConfirmed) {
                    navigate("/login");
                }
            })();
        }
            
    },[dispatch, token, navigate])
    return(
        <div className="order-container">
            <div className="order-header">
                <h1>Order</h1>
                <p>{formateDate(new Date)}</p>
            </div>
            <div className="order-content">
                {
                    loading? (
                        <div className="loading-container">
                            <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            />
                            <p>Loading...</p>
                        </div>
                    ):
                    orders.length > 0 ?
                    orders.map((item, index)=>{
                        return(
                            <OrderCard order={item} key={index}/>
                        )
                    }):
                    <div className="loading-container">{token?"Belum ada pesanan":"Menu LOGIN ada di pojok kanan atas"}</div>
                }
            </div>
        </div>
    )
}