import "../app.css"
import {Line} from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


// ICON
import { TbMoneybag } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDataOrder, fetchOrderData, fetchOrderMontly, fetchTopOrder } from "../../features/orderSlice";
import { fetchDataProduct } from "../../features/productSlice";

export default function Home() {
    const dispatch = useDispatch()

    const products = useSelector((state)=>state.product.totalItems)
    const orders = useSelector((state)=>state.order.orders)
    const topOrder = useSelector((state)=>state.order.topOrder)

    const orderMontly = useSelector((state)=>state.order.orderMontly)
    const [chartData, setChartData] = useState(null)
    
    useEffect(() => {
        if (orderMontly && orderMontly.length > 0) {
          const labels = orderMontly.map((item) => item.date);
          const totals = orderMontly.map((item) => item.total);
    
          setChartData({
            labels,
            datasets: [
              {
                label: "Penjualan Bulanan",
                data: totals,
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                fill: true,
              },
            ],
          });
        }
      }, [orderMontly]);

    const dataApp = [
        {label:"Orders", icon:<TbMoneybag size={40}/>, length:orders.length},
        {label:"Products", icon:<AiOutlineProduct size={40}/>, length:products},
        {label:"Users", icon:<FaUsers size={40}/>, length:89},
    ]

    useEffect(()=>{
        dispatch(fetchOrderData())
        dispatch(fetchOrderMontly())
        dispatch(fetchTopOrder())
        dispatch(fetchDataProduct())
    }, [])

    return(
        <div className="page-container ">
            <h1>Dashboard</h1>
            <div className="home-header">
                {
                    dataApp.map((data, index)=>(
                        <div className="card-header" key={index}>
                            <div className="card-tittle">
                                <div className="icon">{data.icon}</div>
                                <p>{data.label}</p>
                            </div>
                            <p className="data-length">{data.length}</p>
                        </div>
                    ))
                }
            </div>
            <div className="statistik">
                <div className="chart-container">
                    {chartData ? (
                    <Line
                        data={chartData}
                        options={{
                        responsive: true,
                        plugins: {
                            legend: { display: true, position: "top" },
                            title: { display: true, text: "Grafik Penjualan Bulanan" },
                        },
                        maintainAspectRatio:false
                        }}
                    />
                    ) : (
                    <p>Loading chart...</p>
                    )}
                </div>
                <div className="topSale">
                    {
                        topOrder?.map((item, index)=>(
                            <div className="topSale-item" key={index}>
                                <img src={item.productImage} alt="" className="topSale-image" />
                                <div className="topSale-content">
                                    <p>{item.productName}</p>
                                    <p>{item.totalQuantityOrder} Pesanan</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            
        </div>
    )
}