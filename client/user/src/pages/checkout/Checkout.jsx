import { useLocation, useNavigate } from "react-router-dom";
import "./checkout.css";
import { formatIDR } from "../../helpers/formatIDR";
import OrderButton from "../../components/button/OrderButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchInputOrder } from "../../features/orders/orderSlice";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Checkout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [hasSubmited, setHasSubmited] = useState(false)

  const { paymentStatus } = useSelector((state) => state.order);
  const [contactUser, setContactUser] = useState({
    addressShiping: "",
    phoneNumber: "",
  });

  console.log(paymentStatus, 'ISI PAYMENT STATUS')

  const selectedProducts = location.state?.selectedProducts || [];

  const totalPrice = selectedProducts.reduce((acc, current) => {
    return acc + current.quantity * current.Product.price;
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactUser({
      ...contactUser,
      [name]: value,
    });
  };

  const handleOrderProduct = (e) => {
    e.preventDefault();

    setHasSubmited(true)
    const products = selectedProducts?.map((product) => ({
      productId: product.Product.id,
      quantity: product.quantity,
    }));

    dispatch(fetchInputOrder(products, contactUser));
  };

  useEffect(() => {
    if (!paymentStatus && !hasSubmited) return;

    if (paymentStatus === "settlement" || paymentStatus === 'capture') {
      Swal.fire("Payment Success!", "Terima kasih sudah order, Kami akan Hubungi lewat whatsapp untuk proses pengantaran", "success").then(
        () => navigate("/cart")
      );
    } else if (paymentStatus === "pending") {
      Swal.fire("Menunggu pembayaran", "", "info");
    } else if (
      paymentStatus === "deny" ||
      paymentStatus === "cancel" ||
      paymentStatus === "expire"
    ) {
      Swal.fire("Payment Failed!", "", "error");
    }
  }, [paymentStatus, hasSubmited]);

  return (
    <div className="checkoutContainer">
      <div className="checkoutHead">
        <h1>Manga |</h1> <span>Checkout belanja</span>
      </div>

      <div className="checkoutContent">
        <div className="orderContent">
          <table className="checkoutTable">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama produk</th>
                <th>Harga satuan</th>
                <th>Jumlah pesanan</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.length > 0 ? (
                selectedProducts?.map((x, y) => {
                  return (
                    <tr key={y}>
                      <td>{y + 1}</td>
                      <td>{x.Product.name}</td>
                      <td>{formatIDR(x.Product.price)}</td>
                      <td>{x.quantity}</td>
                      <td>{formatIDR(x.quantity * x.Product.price)}</td>
                    </tr>
                  );
                })
              ) : (
                <td colSpan={4}></td>
              )}
            </tbody>
          </table>
          <h4 className="total-price">
            Total pembayaran: {formatIDR(totalPrice)}
          </h4>
        </div>
        <div className="formContent">
          <form onSubmit={(e) => handleOrderProduct(e)}>
            <div className="checkoutLabel">
              <label className="formLabel" htmlFor="">
                Alamat pengiriman
              </label>
              <input
                className="inputTextCheckout"
                type="text"
                placeholder="Masukan alamat lengkap"
                name="addressShiping"
                onChange={handleInputChange}
              />
            </div>
            <div className="checkoutLabel">
              <label className="formLabel" htmlFor="">
                Nomor telepon/WahatsApp
              </label>
              <input
                className="inputTextCheckout"
                type="text"
                placeholder="Masukan nomor yang dapat dihubungi"
                name="phoneNumber"
                onChange={handleInputChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "80%",
              }}
            >
              <OrderButton>Pesan sekarang</OrderButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
