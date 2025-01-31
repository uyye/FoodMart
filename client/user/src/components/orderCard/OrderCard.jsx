import { useState } from "react"
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter"
import formateDate from "../../helpers/formateDate"
import formateHours from "../../helpers/formateHours"
import { formatIDR } from "../../helpers/formatIDR"
import DetailButton from "../button/DetailButton"
import OrderButton from "../button/OrderButton"
import "./orderCard.css"
import InvoiceModal from "../invoiceModal/InvoiceModal"

export default function OrderCard({order}) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const handleOpenModal = ()=>{setIsModalOpen(true)} 
    const handleCLoseModal = ()=>{setIsModalOpen(false)} 

    return(
        <>
            <div className="orderCard-container">
            <div className="cardHeader">
                <div className="ch">
                    <div>
                        <p className="bf" >{capitalizeFirstLetter(order.User.name)}</p>
                        <p className="lf" >Order ID:{order.id}</p>
                    </div>
                    <div><p className="status-tag">{order.status}</p></div>
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
                    <OrderButton handle={handleOpenModal} >Cetak invoice</OrderButton>
                    <DetailButton>Lihat detail</DetailButton>
                </div>
            </div>
        </div>
        {isModalOpen && (
                <InvoiceModal order={order} onClose={handleCLoseModal} />
            )}
        </>
        
        
    )
}