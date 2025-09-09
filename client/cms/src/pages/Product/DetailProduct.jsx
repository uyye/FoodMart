import DeleteButton from "../../components/button/DeleteButton";
import UpdateButton from "../../components/button/UpdateButton";
import { formatIDR } from "../../helpers/formatIDR";
import {useDispatch} from "react-redux"
import "../app.css"
import Swal from "sweetalert2";

// ICON
import { IoClose } from "react-icons/io5";
import { fetchDeleteProduct } from "../../features/productSlice";
import CancelButton from "../../components/button/CancelButton";

export default function DetailProduct({product, onClose, isOpen}) {
    const dispatch =  useDispatch()

    const handleDeleteProduct = (id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(fetchDeleteProduct(id))
                onClose()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
            }
          });
        
    }
   
    if (!isOpen) return null 
    return(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e)=>e.stopPropagation()}>
                <div className="modal-header">
                    <h1>Detail product</h1>
                    {/* <button className="close-button" onClick={onClose}>Cancel</button> */}
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
                    <CancelButton onClose={onClose}>Cancel</CancelButton>
                    <DeleteButton handleDelete={()=>handleDeleteProduct(product.id)}>Hapus</DeleteButton>
                </div>
            </div>
        </div>
    )
}