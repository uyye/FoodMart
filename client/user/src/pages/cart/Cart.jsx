import { useEffect, useState } from "react";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  fetchDeleteCartByProductId,
  updateCartQuantity,
} from "../../features/cart/cartSlice";
import { formatIDR } from "../../helpers/formatIDR";
import QuantityButton from "../../components/quantityButton/QuantityButton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart) || { CartItems: [] };
  const [selectedItems, setSelectedItems] = useState([]);

  console.log(cart, "CART DI PAGE");

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
      dispatch(fetchCart());
    }
  };

  const handleSelectItem = (productId, isChecked) => {
    setSelectedItems((prevSelected) =>
      isChecked
        ? [...prevSelected, productId]
        : prevSelected.filter((id) => id !== productId)
    );
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      const allIds = cart?.CartItems?.map((item) => item.id) || [];
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };

  const calculateSelectedSubtotal = () => {
    if (!cart?.CartItems) return 0;
    return cart.CartItems.reduce((total, item) => {
      if (selectedItems.includes(item.id)) {
        return total + item.Product.price * item.quantity;
      }
      return total;
    }, 0);
  };

  const handleCheckout = () => {
    const selectedProducts = cart.CartItems?.filter((item) =>
      selectedItems.includes(item.id)
    );
    if (!selectedProducts?.length) {
      Swal.fire({
        title: "Kamu belum Memilih Orderan?",
        text: "Silahkan beri centang pada pesanan yang ingin di order",
        icon: "info",
      });
      return;
    }
    navigate(`/checkout`, { state: { selectedProducts } });
  };

  const handleDeletecart = (id) => {
    dispatch(fetchDeleteCartByProductId(id));
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="cartContainer">
      <div className="headCart">
        <h1>Manga |</h1> <span>Keranjang belanja</span>
      </div>
      <div className="cartContent">
        <table className="cartTable">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    selectedItems.length === (cart?.CartItems?.length || 0)
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th>Produk</th>
              <th>Jumlah</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {cart?.CartItems?.length > 0 ? (
              cart.CartItems.map((x) => {
                return (
                  <tr key={x.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(x.id)}
                        onChange={(e) =>
                          handleSelectItem(x.id, e.target.checked)
                        }
                      />
                    </td>
                    <td className="productInfo">
                      <img
                        src={x.Product?.imageUrl}
                        alt=""
                        className="productImage"
                      />
                      <div>
                        <p>{x.Product?.name}</p>
                      </div>
                    </td>
                    <td>
                      <QuantityButton
                        quantity={x.quantity}
                        stock={x.Product?.stock}
                        onQuantityChange={(newQuantity) =>
                          handleQuantityChange(x.Product?.id, newQuantity)
                        }
                      />
                    </td>
                    <td>{formatIDR(x.Product?.price * x.quantity)}</td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeletecart(x.Product.id)}
                    >
                      Delete
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5}>Keranjang kosong</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="cartCheckout">
          <div className="checkOutSub">
            <div>
              <p>Subtotal</p>
              <span>{formatIDR(calculateSelectedSubtotal())}</span>
            </div>
            <button onClick={handleCheckout} className="checkoutButton">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
