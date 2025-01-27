import "../app.css"
import profile from "../../assets/profile.png"
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../features/userSlice";
import formateDate from "../../helpers/formateDate";
import { formatIDR } from "../../helpers/formatIDR";
import { fetchOrderById, resetOrderDetail } from "../../features/orderSlice";


// ICON
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import ContactButton from "../../components/button/ContactButton";

export default function Detailuser() {
    const {id} = useParams()
    const dispatch = useDispatch()

    const user = useSelector((state)=>state.user.user)

    const orderDetail = useSelector((state)=>state.order.orderDetail)

    const [orderInformation, setOrderInformation] = useState({})

    console.log(orderDetail, "ISI DETAIL ORDER DI HALAMAN");

    const handleWhatsappRedirect = (phoneNumber, userName, addressShiping)=>{

        const formateNumber = phoneNumber.replace(/^0/,"62")
        const message = `Halo, saya ingin Mengonfirmasi pengiriman untuk pesanan atas nama ${userName} pada alamat ${addressShiping}.`;
        const whatsappURL = `https://wa.me/${formateNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappURL, "_blank")
    }

    
    
    const handleOrderTrigger = (orderId, status, phoneNumber, addressShiping)=>{
        setOrderInformation({
            name:user.name,
            orderId,
            status,
            phoneNumber,
            addressShiping
        })
        dispatch(fetchOrderById(orderId))
    }
    
    useEffect(()=>{
        dispatch(fetchUserById(id))
        dispatch(resetOrderDetail())
    },[id])

    return(
        <div className="page-container">
            <h1>User detail</h1>
            <div>
                <div className="detail-profile">
                    <div className="photo-cover"></div>
                    <img src={profile} alt="" className="photo-profile"/>
                    <h2>{user.name}</h2>
                    <ul>
                        <li><MdOutlineMailOutline/> {user.email} || <FaWhatsapp/> 085342194873</li>
                        <li><FaLocationDot/> Jl. kemerdekaan 01</li>
                    </ul>
                </div>
            </div>

            <div className="profile-order">
                <div className="data-order">
                    <h3 className="center-text">Order</h3>
                    {
                        user.Orders?.length > 0 ?
                        user.Orders?.map((item, index)=>(
                            <div className="card-order" key={index} onClick={()=>handleOrderTrigger(item.id,item.status, item.phoneNumber, item.addressShiping)}>
                                <div className="ch">
                                    <div>
                                        <ul>
                                            <li>Order ID: {item.id}</li>
                                            <li>Order Date: {formateDate(item.createdAt)}</li>
                                            {/* <li>Address shiping: {item.addressShiping}</li> */}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="status-tag">Success</p>
                                    </div>
                                </div>
                            </div>
                        )):
                        <div className="data-order">
                            <div className="card-order center-text">
                                <p>Belum ada orderan...</p>
                            </div>
                        </div>
                    }
                    
                </div>
                <div className="data-order">
                    <h3 className="center-text">Detail order</h3>
                    
                    {
                        orderDetail.length > 0?
                        <div className="detail-order">
                            <div className="ch ">
                            <p>ORDER ID:{orderInformation.orderId}</p>
                            <p className="status-tag">{orderInformation.status}</p>
                            </div>
                        <table className="table-column">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Product</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderDetail.length > 0 &&
                                    orderDetail.map((item, index)=>(
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.Product.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{formatIDR(item.price)}</td>
                                            <td>{formatIDR(item.subTotal)}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className="recipient">
                            <ContactButton handleButton={()=>handleWhatsappRedirect(orderInformation.phoneNumber, orderInformation.name, orderInformation.addressShiping)}>Hubungi penerima</ContactButton>
                            <br />
                            <ul>
                                <li><IoIosContact/> {orderInformation.name}|| <FaWhatsapp/> Whatsapp: {orderInformation.phoneNumber}</li>
                                <li className="center-text"><FaLocationDot/> Alamat: {orderInformation.addressShiping}</li>
                            </ul>
                        </div>
                    </div>:
                    <div className="card-order center-text">
                        <p>Pilih pesanan untuk menampilkan data...</p>
                    </div>
                    }
                    
                </div>
            </div>
        </div>
    )
}