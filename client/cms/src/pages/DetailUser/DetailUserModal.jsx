import ContactButton from "../../components/button/ContactButton";
import { formatIDR } from "../../helpers/formatIDR";

//ICON
import { FaWhatsapp } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

export default function DetailUserModal({isOpen,orderInformation, orderDetail}){
    // console.log('MASUK USER MODAL'); 
    console.log(orderDetail, "orderDetail");
       
    return(
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Detail Order User</h2>
                </div>
                <div className="modal-content">
                    {orderDetail.length > 0 ? (
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
                  {orderDetail.length > 0 &&
                    orderDetail.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Product.name}</td>
                        <td>{item.quantity}</td>
                        <td>{formatIDR(item.price)}</td>
                        <td>{formatIDR(item.subTotal)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <div className="recipient">
                <ContactButton
                  handleButton={() =>
                    handleWhatsappRedirect(
                      orderInformation.phoneNumber,
                      orderInformation.name,
                      orderInformation.addressShiping
                    )
                  }
                >
                  Hubungi penerima
                </ContactButton>
                <br />
                <ul>
                  <li>
                    <IoIosContact /> {orderInformation.name}|| <FaWhatsapp />{" "}
                    Whatsapp: {orderInformation.phoneNumber}
                  </li>
                  <li className="center-text">
                    <FaLocationDot /> Alamat: {orderInformation.addressShiping}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="card-order center-text">
              <p>Pilih pesanan untuk menampilkan data...</p>
            </div>
          )}
                </div>
            </div>
        </div>
    )
}