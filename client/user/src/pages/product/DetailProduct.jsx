import { useNavigate, useParams } from "react-router-dom"
import "./detailProduct.css"
import instance from "../../api/axiosInstance"
import { useEffect, useState } from "react"
import { formatIDR } from "../../helpers/formatIDR"
import Footer from "../../components/footer/Footer"
import Swal from "sweetalert2"
import {useDispatch} from "react-redux"
import { fetchInputCart } from "../../features/cart/cartSlice"

export default function DetailProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)

    const fetchDetail = async ()=>{
        try {
            const {data} = await instance({
                method:"get",
                url:`/products/${id}`
            })
            setProduct(data)
        } catch (error) {
            console.log(error);
        }
    }

    const QuantityHandler =(value)=>{
        setQuantity((prevQuantity)=>{
            if (value === "up" && prevQuantity < product.stock) {
               return prevQuantity + 1
            }else if(value === "down" && prevQuantity > 1){
               return prevQuantity - 1
            }
            return prevQuantity
        })
    }

    const handleButtonAddToCart = async()=>{

        dispatch(fetchInputCart(id, quantity, navigate))
        // try {
        //     await instance({
        //         method:"post",
        //         url:"/carts",
        //         data:{
        //             productId:id,
        //             quantity:quantity
        //         },
        //         headers:{
        //             "Authorization":`bearer ${localStorage.getItem("access_token")}`,
        //             "Content-Type":"application/json"
        //         }
        //     })
        //     Swal.fire({
        //         title:"Success",
        //         text:"Berhasil menambahkan produk ke keranjang",
        //         icon:"success",
        //         showConfirmButton:false,
        //         timer:2000
        //     })
            
            
        // } catch (error) {
        //     if (error.response.status === 401) {
        //         const result = await Swal.fire({
        //             title:"Anda belum login?",
        //             text:"Silahkan login terlebih dahulu",
        //             icon:"question",
        //             showCancelButton: true,
        //             confirmButtonText:"Login",
        //             cancelButtonText:"Kembali"
        //         })

        //         if(result.isConfirmed){
        //             navigate("/login")
        //         }
        //     }
        // }
    }

    useEffect(()=>{
        fetchDetail()
    },[id])

    return(
        <div className="detailContainer" >
            <div className="detailForm">
                <div className="detailImageFrame">
                    <img src={product.imageUrl} alt="" className="detailImage" />
                </div>
                <div className="detailProduct">
                    <div className="details">
                        <h1 style={{fontWeight:"normal"}}>{product.name}</h1>
                        <div className="stockPrice">
                            <h3 style={{color:"#6aaa57"}}>{formatIDR(product.price)}</h3>
                            <p>{`Stock [${product.stock}]`}</p>
                        </div>
                        <hr />
                        <h4 style={{fontWeight:"normal"}}>Description</h4>
                        <article>{product.description}</article>
                        <hr />
                    </div>
                    <div className="orderForm">
                        <div className="formQuantity">
                            <p>Quantity</p>
                            <div>
                                <button onClick={()=>QuantityHandler("up")} className="quantityButton">+</button>
                                <span className="detailQuantity">{quantity}</span>
                                <button onClick={()=>QuantityHandler("down")} className="quantityButton">-</button>
                            </div>
                        </div>
                        <div className="formSubmit">
                            <button className="orderSubmit" onClick={handleButtonAddToCart}>Tambah ke keranjang</button>
                            <button className="orderSubmit">Beli sekarang</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}