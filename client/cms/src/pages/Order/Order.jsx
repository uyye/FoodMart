import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMarkOrder,
  fetchOrderData,
  setFilter,
  setPage,
  setShowAll,
} from "../../features/orderSlice";
import formateDate from "../../helpers/formateDate";
import { formatIDR } from "../../helpers/formatIDR";
import { useNavigate } from "react-router";
import { CiRead } from "react-icons/ci";
import { useState } from "react";

export default function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, page, filter, totalItems } = useSelector((state) => state.order);
  const [activeTab, setActiveTab] = useState("");

  const itemsPerPage = 10
  const totalPages = Math.ceil(totalItems / itemsPerPage) 
  const tabs = [
    { name: "Terbaru", value: "" },
    { name: "Dibaca", value: true },
    { name: "Belum Dibaca", value: false },
  ];

  const toDetail = (order) => {
    dispatch(fetchMarkOrder(order.id));
    navigate(`/order/detail`, { state: { order } });
  };

  const handlePage = (page)=>{
    dispatch(setPage(page))
  }

  const handleSetFilter = (value)=>{
    dispatch(setFilter(value))
    setActiveTab(value)
  }

  useEffect(() => {
    dispatch(fetchOrderData());
  }, [dispatch, page, filter]);
  return (
    <div className="page-container">
      <h1>List Order</h1>
      <div className="filter-tabs">
        <ul>
          {tabs.map((tab, index) => (
            <li
              key={index}
              onClick={() => handleSetFilter(tab.value)}
              className={activeTab === tab.name ? "active" : ""}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>

      <table className="table-column">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Order ID</th>
            <th className="date">Order Date</th>
            <th>Total Payment</th>
            <th>Status Payment</th>
            <th>
              <CiRead />
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={index} onClick={() => toDetail(order)}>
                <td>{index + 1}</td>
                <td>{order.User?.name}</td>
                <td>{order.id}</td>
                <td className="date">{formateDate(order.createdAt)}</td>
                <td>{formatIDR(order.totalPrice)}</td>
                <td>{order.status}</td>
                <td>
                    {order.isRead ? <span>-</span>: <span style={{color:'#2196f3'}}>New</span>}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No Order Data</td>
            </tr>
          )}
          <tr>
            <td colSpan={6}>
              <div className="pagination">
                <button
                  disabled={page === 1}
                  onClick={() => handlePage(page - 1)}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePage(index + 1)}
                    className={page === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  disabled={page === totalPages}
                  onClick={() => handlePage(page + 1)}
                >
                  Next
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
