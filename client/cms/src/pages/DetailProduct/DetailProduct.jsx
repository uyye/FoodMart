import DeleteButton from "../../components/button/DeleteButton";
import UpdateButton from "../../components/button/UpdateButton";
import { formatIDR } from "../../helpers/formatIDR";
import {useDispatch} from "react-redux"
import "../app.css"

// ICON
import { IoClose } from "react-icons/io5";
import { fetchDeleteProduct } from "../../features/productSlice";

export default function DetailProduct({product, onClose, isOpen}) {
    const dispatch =  useDispatch()

    const handleDeleteProduct = (id)=>{
        dispatch(fetchDeleteProduct(id))
        onClose()
    }
   
    if (!isOpen) return null 
    return(
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h1>Detail product</h1>
                    <button className="close-button" onClick={onClose}><IoClose size={20}/></button>
                </div>
                <div className="modal-content">
                    <div className="modal-data">
                        <img src={product.imageUrl} alt="" className="modal-image" />
                    </div>
                    <div className="modal-data">
                        <ul>
                            <li><h2>{product.name}</h2></li>
                            <li>Harga: {formatIDR(product.price)}</li>
                            <li>Stock: {product.stock}</li>
                            <li>{product.description}</li>
                        </ul>
                    </div>
                </div>
                <div className="modal-footer">
                    <DeleteButton handleDelete={()=>handleDeleteProduct(product.id)}>Hapus</DeleteButton>
                </div>
            </div>
        </div>
    )
}