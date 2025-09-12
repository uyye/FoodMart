import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailOrder } from "../../features/orders/orderSlice";
import { formatIDR } from "../../helpers/formatIDR";
import CancelButton from "../../components/button/CancelButton";
import formateDate from "../../helpers/formateDate";

export default function OrderDetail({ modal, id }) {
  const dispatch = useDispatch();
  const { detailOrder } = useSelector((state) => state.order);

  console.log(detailOrder, "DETAIL ORDER DI MODAL");
  useEffect(() => {
    dispatch(fetchDetailOrder(id));
  }, [id, dispatch]);

  return (
    <div className="modal-overlay" onClick={modal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h1>Detail pesanan</h1>
          {/* <p>{formateDate()}</p> */}
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Produk</th>
                <th>Harga</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {detailOrder.length > 0 ? (
                <>
                  {detailOrder.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.Product?.name}</td>
                      <td>{formatIDR(item.Product?.price)}</td>
                      <td>{item.quantity} pcs</td>
                      <td>{formatIDR(item.subTotal)}</td>
                    </tr>
                  ))}
                  <tr style={{color:'#e25329'}}>
                    <td
                      colSpan={4}
                      style={{ textAlign: "left ", fontWeight: "bold" }}
                    >
                      Total Keseluruhan
                    </td>
                    <td style={{ fontWeight: "bold" }}>
                      {formatIDR(
                        detailOrder.reduce(
                          (acc, item) => acc + item.subTotal,
                          0
                        )
                      )}
                    </td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td>Tidak Ada Pesanan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="modal-footer">
            <CancelButton onClose={modal}>Kembali</CancelButton>
        </div>
      </div>
    </div>
  );
}
