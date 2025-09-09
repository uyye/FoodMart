import "../app.css";
import profile from "../../assets/profile.png";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../features/userSlice";
import formateDate from "../../helpers/formateDate";
import { fetchOrderById, resetOrderDetail } from "../../features/orderSlice";

// ICON
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import DetailUserModal from "./DetailUserModal";

export default function Detailuser() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const orderDetail = useSelector((state) => state.order.orderDetail);

  console.log(user, 'DATA USER DI PAGE')
  const [detailModal, setDetailModal] = useState(false);
  const [orderInformation, setOrderInformation] = useState({});

  console.log(detailModal, "orderInformation");

  const handleWhatsappRedirect = (phoneNumber, userName, addressShiping) => {
    const formateNumber = phoneNumber.replace(/^0/, "62");
    const message = `Halo, saya ingin Mengonfirmasi pengiriman untuk pesanan atas nama ${userName} pada alamat ${addressShiping}.`;
    const whatsappURL = `https://wa.me/${formateNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  const handleOrderTrigger = (orderId, status, phoneNumber, addressShiping) => {
    setDetailModal(!detailModal);
    setOrderInformation({
      name: user.name,
      orderId,
      status,
      phoneNumber,
      addressShiping,
    });
    dispatch(fetchOrderById(orderId));
  };

  useEffect(() => {
    dispatch(fetchUserById(id));
    dispatch(resetOrderDetail());
  }, [id]);

  return (
    <div className="page-container">
      <h1>User detail</h1>
      <div className="profile-page">
        <div className="profile-container">
          <div className="detail-profile">
            <div className="photo-cover"></div>
            <img src={profile} alt="" className="photo-profile" />
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Address</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{}</td>
                  <td>{}</td>
                  {/* <td>{user.}</td> */}
                </tr>
              </tbody>
            </table>
            
            {/* <h2>{user.name}</h2> */}
            {/* <ul>
              <li>
                <MdOutlineMailOutline /> {user.email} || <FaWhatsapp />{" "}
                085342194873
              </li>
              <li>
                <FaLocationDot /> Jl. kemerdekaan 01
              </li>
            </ul> */}
          </div>
        </div>
      </div>

      {/* <div className="profile-order">
        <div className="data-order">
          <h3 className="center-text">Order</h3>
          {user.Orders?.length > 0 ? (
            user.Orders?.map((item, index) => (
              <div
                className="card-order"
                key={index}
                onClick={() =>
                  handleOrderTrigger(
                    item.id,
                    item.status,
                    item.phoneNumber,
                    item.addressShiping
                  )
                }
              >
                <div className="ch">
                  <div>
                    <ul>
                      <li>Order ID: {item.id}</li>
                      <li>Order Date: {formateDate(item.createdAt)}</li>
                    </ul>
                  </div>
                  <div>
                    <p className="status-tag">Success</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="data-order">
              <div className="card-order center-text">
                <p>Belum ada orderan...</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {detailModal && (
        <DetailUserModal isOpen={detailModal} orderInformation={orderInformation} orderDetail={orderDetail} />
      )} */}
    </div>
  );
}
