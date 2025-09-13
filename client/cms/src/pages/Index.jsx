import { Outlet } from "react-router";
import "./index.css";
import SideNavbar from "../components/sideNavbar/SideNavbar";
import { useEffect } from "react";
import socket from "../api/socket";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { pushOneOrder } from "../features/orderSlice";

export default function Index() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('MASUK KE INDEX');
    
    socket.on("newOrder", (data) => {
      console.log(data, 'CEK CEK')
      toast.info(data.message, { position: "top-right", autoClose: 3000 });
      dispatch(pushOneOrder(data.order));
    });

    return () => {
      socket.off("newOrder");
    };
  }, [dispatch]);
  return (
    <div className="container">
      <ToastContainer />
        <SideNavbar />
      <Outlet />
    </div>
  );
}
