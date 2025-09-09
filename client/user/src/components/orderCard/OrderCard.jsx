import { useState } from "react"
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter"
import formateDate from "../../helpers/formateDate"
import formateHours from "../../helpers/formateHours"
import { formatIDR } from "../../helpers/formatIDR"
import DetailButton from "../button/DetailButton"
import OrderButton from "../button/OrderButton"
import "./orderCard.css"
import InvoiceModal from "../invoiceModal/InvoiceModal"
import { useDispatch } from "react-redux"
import { fetchInputOrder, fetchPayment } from "../../features/orders/orderSlice"
import { useNavigate } from "react-router-dom"

export default function OrderCard({order}) {
    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const handleOpenModal = ()=>{setIsModalOpen(true)} 
    const handleCLoseModal = ()=>{setIsModalOpen(false)} 
    
    const handlePayment = async()=>{
        await dispatch(fetchPayment(order.id))
    }
    return(
        <>
            <div className="orderCard-container">
            <div className="cardHeader">
                <div className="ch">
                    <div>
                        <p className="bf" >{capitalizeFirstLetter(order.User.name)}</p>
                        <p className="lf" >Order ID:{order.id}</p>
                    </div>
                    <div>
                        <p className={order.status === 'pending' ? "status-tag-pending": "status-tag"}>
                            {order.status}
                        </p>
                    </div>
                </div>
                <div className="ch">
                    <p>{formateDate(order.createdAt)}</p>
                    <p>{formateHours(order.createdAt)}</p>
                </div>
            </div>
            <div className="cardBody">
                <table>
                    <thead>
                        <tr>
                            <th>Items</th>
                            <th>Qty</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.OrderDetails.map((item, index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{item.Product.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{formatIDR(item.subTotal)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="cardFooter">
                <div className="ch">
                    <p>Total</p>
                    <p>{formatIDR(order.totalPrice)}</p>
                </div>
                <div className="center">
                    <DetailButton>Lihat detail</DetailButton>
                    {order.status === 'pending'?
                    <OrderButton  handle={handlePayment}>Bayar sekarang</OrderButton>:
                    <OrderButton handle={handleOpenModal} >Cetak invoice</OrderButton>}
                </div>
            </div>
        </div>
        {isModalOpen && (
                <InvoiceModal order={order} onClose={handleCLoseModal} />
            )}
        </>
        
        
    )
}