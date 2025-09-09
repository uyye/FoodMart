import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { fetchOrderById } from "../../features/orderSlice";
import { formatIDR } from "../../helpers/formatIDR";
import WhatsappButton from "../../components/button/WhatsappButton";

export default function DetailOrder() {
  const location = useLocation();
  const order = location.state?.order;

  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.order.orderDetail);
  console.log(orderDetail);

  useEffect(() => {
    dispatch(fetchOrderById(order.id));
  }, [dispatch]);

  return (
    <div className="page-container">
      <h1>Detail Order</h1>
      <div className="order-header">
        <div className="ch">
          <div>
            <p>
              Order ID <span>#{order.id}</span>
            </p>
          </div>
          <div style={{fontWeight:'bold', color:'red'}}>
            {
              order.status === 'success'?
              <span style={{color:'#25D366'}}>{order.status}</span>:
              <span>{order.status}</span>
            }
          </div>
        </div>
      </div>
      <div className="main-order">
        <div className="products-order">
          <div className="topSale">
            <p>
              Items <span>{orderDetail.length}</span>
            </p>
            <br />
            {orderDetail.length > 0 &&
              orderDetail.map((item, index) => (
                <div className="topSale-item">
                  <img
                    src={item.Product?.imageUrl}
                    alt=""
                    className="topSale-image"
                  />
                  <div className="topSale-content">
                    <p>{item.Product?.name}</p>
                    <p>{formatIDR(item.Product?.price)} / 1 Product</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="contact-order">
          <div className="topSale">
            <p>Shipment</p> <br />
            <div className="topSale-item">
              <div className="topSale-content">
                <p>Recipient</p>
                <p>{order.User.name}</p>
              </div>
            </div>
            <div className="topSale-item">
              <div className="topSale-content">
                <p>Delivery address</p>
                <p>{order.addressShiping}</p>
              </div>
            </div>
            <div className="topSale-item">
              <div className="topSale-content">
                <p>Contact person</p>
                <WhatsappButton
                  phoneNumber={order.phoneNumber}
                  message={`Hallo kami ingin mengkonfirmasi pesanan atas nama ${order.User.name} dengan alamat pengiriman ${order.addressShiping} Silahkan koreksi jika ada kesalahan Alamat Terimakasih.`}
                >
                  {order.phoneNumber}
                </WhatsappButton>
              </div>
            </div>
            <div className="topSale">
              <table className="table-column">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetail.length > 0 &&
                    orderDetail.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Product?.name}</td>
                        <td>{formatIDR(item.Product?.price)}</td>
                        <td>{item.quantity}</td>
                        <td>
                          {formatIDR(item.quantity * item.Product?.price)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <h4 className="total-price">
                Total: {formatIDR(order.totalPrice)}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
