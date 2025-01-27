import React, { useEffect, useState } from "react";
import "../app.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataProduct, fetchDetailProduct, setFilter, setPage, setSearch } from "../../features/productSlice";

// ICON
import { BiDetail } from "react-icons/bi";
import { MdOutlineAddBox } from "react-icons/md";
import DetailProduct from "../DetailProduct/DetailProduct";
import InputProduct from "../InputProduct/InputProduct";
import { CiEdit } from "react-icons/ci";

export default function Product() {
    const dispatch = useDispatch();
    const { products, totalItems, page, filter, search } = useSelector((state) => state.product);
    const [activeTab, setActiveTab] = useState("");
    const [isModal, setIsmodal] = useState(false)
    const [inputModal, setInputModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const product = useSelector((state)=> state.product.detailProduct)

    const tabs = [
        {name:"Semua", value:""},
        {name:"Makanan", value:"Makanan"},
        {name:"Minuman", value:"Minuman"}
    ];
    const itemsPerPage = 10; // Jumlah item per halaman
    const totalPages = Math.ceil(totalItems / itemsPerPage);

   

    const handlePageChange = (pageNumber) => {
        dispatch(setPage(pageNumber));
    };

    const handleFilterChange = (tab)=>{
        dispatch(setFilter(tab))
        setActiveTab(tab)
    }

    const handelSearchChange = (keyword)=>{
        dispatch(setSearch(keyword))
    }

    const handleOpenDetail = (id)=>{
        setIsmodal(true)
        dispatch(fetchDetailProduct(id))
    }

    const handleOpenEdit = (id)=>{
        setUpdateModal(true)
        dispatch(fetchDetailProduct(id))
    }

    useEffect(() => {
        dispatch(fetchDataProduct());
    }, [dispatch, page, filter, search]);

    return (
        <div className="page-container">
            <h1>Manage Product</h1>
            <div className="filter-tabs">
                <ul>
                    {tabs.map((tab, index) => (
                        <li
                            key={index}
                            onClick={() => handleFilterChange(tab.value)}
                            className={activeTab === tab.name ? "active" : ""}
                        >
                            {tab.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="product-fitur">
                <input
                    type="search"
                    className="search-input"
                    placeholder="Search product ...."
                    value={search}
                    onChange={(e)=>handelSearchChange(e.target.value)}
                />
                <button className="product-button" onClick={()=>setInputModal(true)}>
                    <MdOutlineAddBox /> Product
                </button>
            </div>
            <div className="product-table">
                <table className="table-column">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Product</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={index}>
                                    <td>{index + 1 + (page - 1) * itemsPerPage}</td>
                                    <td>{product.name}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td className="td-action">
                                        <button className="product-button" onClick={()=>handleOpenDetail(product?.id)}>
                                            <BiDetail /> Detail
                                        </button>
                                        <button className="product-button" onClick={()=>handleOpenEdit(product?.id)}>
                                            <CiEdit /> Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>Silahkan Tambahkan Product</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={page === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                >
                    Next
                </button>
            </div>
            {
                isModal &&
                <DetailProduct
                    onClose={()=>setIsmodal(false)}
                    isOpen={isModal}
                    product={product}
                />
            }
            {
                inputModal &&
                <InputProduct
                    onClose={()=>setInputModal(false)}
                    isOpen={inputModal}
                />
            }
            {
                updateModal &&
                <InputProduct
                page={"edit"}
                onClose={()=>setUpdateModal(false)}
                isOpen={updateModal}
                data={product}
                />
            }


        </div>
    );
}
