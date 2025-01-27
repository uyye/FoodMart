import "../app.css"
import Swal from "sweetalert2"
// ICON
import { IoClose } from "react-icons/io5";


// LOTTIE 
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchInputProduct, fetchUpdateProduct } from "../../features/productSlice";
import SubmitButton from "../../components/button/SubmitButton";

export default function InputProduct({onClose, isOpen, page, data}) {

    const dispatch = useDispatch()
    const [product, setProduct] = useState({
        name:data?.name || "",
        category: data?.category || "",
        description: data?.description || "",
        price: data?.price || "",
        stock:data?.stock || "",
    })

    const [image, setImage] = useState(null)

    useEffect(() => {
        if (data) {
            setProduct({
                name: data.name || "",
                category: data.category || "",
                description: data.description || "",
                price: data.price || "",
                stock: data.stock || "",
            });
        }
    }, [data]);

    const handleInputChange = (e)=>{
        const {name, value} = e.target
        setProduct({
            ...product,
            [name] :value
        })
    }

    const handleInputImage = (e)=>{
        setImage(e.target.files[0])
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("category", product.category);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("stock", product.stock);
        if(image){
            formData.append("file", image)
        }


        console.log(product, "inputan baru");
        
        if (page === "edit") {
            dispatch(fetchUpdateProduct(formData, data.id))
            Swal.fire({
                icon:"success",
                title:"Success",
                text:"Berhasil update data produk",
                showConfirmButton:false,
                timer:2000
            })
        }else{
            dispatch(fetchInputProduct(formData))
            Swal.fire({
                icon:"success",
                title:"Success",
                text:"Berhasil menambahkan produk",
                showConfirmButton:false,
                timer:2000
            })
        }
        onClose()
    }

    if(!isOpen) return null
    return(
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h1>{page === "edit"?"Edit product":"Add product"}</h1>
                    <button className="close-button" onClick={onClose}><IoClose size={20}/></button>
                </div>
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="modal-data">
                        <div className="label-input">
                            <label htmlFor="">Nama produk</label>
                            <input value={product.name} name="name" onChange={handleInputChange} type="text" className="input-text" placeholder="Masukan nama produk"/>
                        </div>
                        <div className="label-input">
                            <label htmlFor="">Kategori </label>
                            <select value={product.category} name="category" onChange={handleInputChange} className="input-text">
                                <option value="" disabled>Pilih kategori</option>
                                <option value="Makanan">Makanan</option>
                                <option value="Minuman">Minuman</option>
                            </select>
                        </div>
                        <div className="label-input">
                            <label htmlFor="">Deskripsi </label>
                            <textarea value={product.description} name="description" onChange={handleInputChange} id="" placeholder="Masukan deskripsi produk" className="input-text"></textarea>
                        </div>
                        <div className="label-input">
                            <label htmlFor="">Harga </label>
                            <input value={product.price} name="price" onChange={handleInputChange} type="number" className="input-text" placeholder="Masukan harga produk"/>
                        </div>
                        <div className="label-input">
                            <label htmlFor="">Stok </label>
                            <input value={product.stock} name="stock" onChange={handleInputChange} type="number" className="input-text" placeholder="Masukan jumlah stok produk"/>
                        </div>
                        <div className="label-input">
                            <label htmlFor="">Gambar </label>
                            <input name="image" onChange={handleInputImage} type="file" className="input-text" />
                        </div>
                        <SubmitButton>Submit</SubmitButton>
                    </div>
                    <div className="modal-data">
                        <DotLottieReact
                            src="https://lottie.host/5aaf50f9-61be-4a81-b681-15e09cf72c2a/fOOVqoAfn7.lottie"
                            loop
                            autoplay
                        />
                    </div>
                </form>

            </div>
        </div>
    )
}