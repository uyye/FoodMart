import { useEffect, useState } from "react";
import "./about.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTopOrder,
  fetchTotalOrders,
} from "../../features/orders/orderSlice";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import { fetchProducts } from "../../features/products/productSlice";
import { fetchUsers } from "../../features/users/userSlice";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function About() {
  const dispatch = useDispatch();

  const topOrder = useSelector((state) => state.order.topOrder);
  const totalOrders = useSelector((state) => state.order.totalOrders);
  const totalProducts = useSelector((state) => state.products.totalItems);
  const totalUsers = useSelector((state) => state.users.totalUsers);

  const [refOrder, inViewOrder] = useInView({ triggerOnce: true });
  const [refProduct, inViewProduct] = useInView({ triggerOnce: true });
  const [refUser, inViewUser] = useInView({ triggerOnce: true });

  useEffect(() => {
    dispatch(fetchTopOrder());
    dispatch(fetchTotalOrders());
    dispatch(fetchProducts());
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-top">
          <div className="about-introduce">
            <div style={{ color: "#ffa600" }}>
              <h1>About Us</h1>
              <h2>
                MangaFood
                <br />
                Discover the perfect food and drink <br /> for every day
              </h2>
            </div>
            <p style={{ fontSize: "12pt" }}>
              FoodMart hadir sebagai solusi terbaik untuk memenuhi kebutuhan
              kuliner Anda dengan aneka makanan lezat, segar, dan berkualitas.
              Dari camilan ringan hingga hidangan utama yang menggugah selera,
              kami siap memanjakan lidah Anda dengan cita rasa istimewa yang
              cocok untuk semua kesempatan.
              <br /> Dengan pelayanan yang cepat dan ramah, FoodMart adalah
              pilihan tepat untuk pengalaman kuliner yang tak terlupakan!
              <br />
              FoodMart juga menghadirkan berbagai promo menarik
              dan harga yang bersahabat, sehingga Anda bisa menikmati hidangan
              favorit tanpa harus khawatir soal budget. Dengan beragam pilihan
              menu yang selalu up-to-date.
            </p>
            <div className="data-length">
              <div className="data" ref={refOrder}>
                <h3>
                  {inViewOrder && <CountUp end={totalOrders} duration={2} />}
                </h3>
                <p>Pesanan</p>
              </div>
              <div className="data" ref={refProduct}>
                <h3>
                  {inViewProduct && (
                    <CountUp end={totalProducts} duration={2} />
                  )}
                </h3>
                <p>Produk</p>
              </div>
              <div className="data" ref={refUser}>
                <h3>
                  {inViewUser && <CountUp end={totalUsers} duration={2} />}
                </h3>
                <p>Pengguna</p>
              </div>
            </div>
          </div>
          <div className="about-introduce">
            <Swiper
              navigation={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
            >
              {topOrder.map((item, index) => (
                <SwiperSlide key={index}>
                  <img src={item.productImage} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}
