import { useDispatch, useSelector } from "react-redux";
import "./order.css";
import { useEffect } from "react";
import { fetchOrder } from "../../features/orders/orderSlice";
import OrderCard from "../../components/orderCard/OrderCard";
import formateDate from "../../helpers/formateDate";
import { ColorRing } from "react-loader-spinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { formatIDR } from "../../helpers/formatIDR";
import DetailButton from "../../components/button/DetailButton";
import { useState } from "react";
import OrderDetail from "./OrderDetail";

export default function Order() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const todayOrders = orders?.filter(
    (item) => formateDate(item.createdAt) === formateDate(new Date())
  );
  const latesOrders = orders
    ?.filter((item) => formateDate(item.createdAt) !== formateDate(new Date()))
    .slice(0, 10);
  
  const [modal, setModal]= useState(false)
  const [detailId, setDetailId] = useState(0)
  console.log(orders, 'ORDERS')
  const modalHandler =(id)=>{
    setDetailId(id)
    setModal((prev)=>!prev)
  }

  useEffect(() => {
    if (token) {
      dispatch(fetchOrder());
    } else {
      (async () => {
        const result = await Swal.fire({
          title: "Belum Login?",
          text: "Login untuk memulai pesanan",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Login",
          cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
          navigate("/login");
        }
      })();
    }
  }, [dispatch, token, navigate]);
  return (
    <div className="order-container">
      <div className="order-header">
        <h1>Orders</h1>
        <p>{formateDate(new Date())}</p>
      </div>
      {/* <hr  style={{border:'1px solid #ddd'}}/> */}
      {/* <div className="order-content">
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
            </div> */}
      <div className="order-content">
        <p>Today</p>
        <table className="tableColumn">
          <thead>
            <tr>
              <th>No</th>
              <th>Id</th>
              <th>Tanggal</th>
              <th>Total</th>
              <th>Status</th>
              <th>Detai pesanan</th>
            </tr>
          </thead>
          <tbody>
            {todayOrders.length > 0 ? (
              todayOrders.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{formateDate(item.createdAt)}</td>
                  <td>{formatIDR(item.totalPrice)}</td>
                  <td>{item.status}</td>
                  <td><DetailButton modal={()=>modalHandler(item.id)}>Detail</DetailButton></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No Order</td>
              </tr>
            )}
          </tbody>
        </table>
        <p>Previously</p>
        <table className="tableColumn">
          <thead>
            <tr>
              <th>No</th>
              <th>Id</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Detail Pesanan</th>
            </tr>
          </thead>
          <tbody>
            {latesOrders.length > 0 ? (
              latesOrders.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{formateDate(item.createdAt)}</td>
                  <td>{formatIDR(item.totalPrice)}</td>
                  <td>{item.status}</td>
                  <td><DetailButton modal={()=>modalHandler(item.id)} >Detail</DetailButton></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No orders</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {modal && <OrderDetail modal={modalHandler} ordersData={orders} id={detailId}/>}
    </div>
  );
}
