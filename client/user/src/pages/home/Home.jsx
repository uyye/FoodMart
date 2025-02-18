import "./home.css"
import { useEffect, useState } from "react"
import Card from "../../components/card/Card"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts, setPage, setSort, setFilter, setSearch } from "../../features/products/productSlice"
import { Link } from "react-router-dom"
import FilterButton from "../../components/button/FilterButton"

export default function Home() {
    const dispatch = useDispatch() 
    const { products, totalItems, page, sort, filter, search } = useSelector((state)=>state.products)
    const totalPages = Math.ceil(totalItems / 10)

    const handlePageChange = (page) => {
        dispatch(setPage(page)) ;
    };

    const handleFilter =(filter)=>{
        dispatch(setFilter(filter))
    }

    const handlerSearch=(searchKeyword)=>{
        dispatch(setSearch(searchKeyword))
    }

    const renderPagination = () => {        
        const pagination = [];
        const startPage = Math.max(1, page - 2);
        const endPage = Math.min(totalPages, page + 2);

        if (startPage > 1) {
            pagination.push(
                <button key={1} onClick={() => handlePageChange(1)}>
                    1
                </button>
            );
            if (startPage > 2) {
                pagination.push(<span key="start-ellipsis">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pagination.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={page === i ? "active" : ""}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pagination.push(<span key="end-ellipsis">...</span>);
            }
            pagination.push(
                <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                </button>
            );
        }

        return pagination;
    };

    useEffect(()=>{
        dispatch(fetchProducts())
    },[dispatch , page, sort, filter, search])

    return(
        <div className="homeContainer">
            <div className="banner">
                <p>MangaFood</p>
                <h1 >Discover the perfect food and drink <br /> for every day</h1>
            </div>
            <form className="searchProduct" action="">
                <input type="search" className="searchInput" placeholder="Search product..." value={search} onChange={(e)=>handlerSearch(e.target.value)} />
            </form>
            <div className="filter-form">
                <FilterButton handler={()=>handleFilter("")}>Semua</FilterButton>
                <FilterButton handler={()=>handleFilter("Makanan")}>Makanan berat</FilterButton>
                <FilterButton handler={()=>handleFilter("Makanan R")}>Makanan ringan</FilterButton>
                <FilterButton handler={()=>handleFilter("Minuman")}>Minuman</FilterButton>
            </div>
            <div className="cardFrame">
                <div> 
                    {
                        products?
                        products.map((x,y)=>{
                            return(
                                <Link key={y} to={`/Product/${x.id}`}>
                                    <Card  item={x}/>
                                </Link>
                            )
                        }):
                        <div>no data</div>
                    }
                </div>
            </div>
            <div className="pagination">
                {renderPagination()}
            </div>

        </div>
    )
}