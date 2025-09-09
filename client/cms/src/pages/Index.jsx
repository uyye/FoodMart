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
    socket.on("newOrder", (data) => {
      toast.info(data.message, { position: "top-right", autoClose: 3000 });
      dispatch(pushOneOrder(data.order));
    });

    return () => {
      socket.off("newOrder");
    };
  }, []);
  return (
    <div className="container">
      <ToastContainer />
        <SideNavbar />
      <Outlet />
    </div>
  );
}
