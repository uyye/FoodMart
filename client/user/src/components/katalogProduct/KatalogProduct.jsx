import "./katalogProduct.css"
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineFoodBank } from "react-icons/md";
import { RiDrinks2Line } from "react-icons/ri";
export default function KatalogProduct() {
    const product = [
        {type:"Makanan Ringan", icon:<IoFastFoodOutline className="icon"/>, description:"Camilan renyah dan praktis, cocok untuk segala suasana!"},
        {type:"Makanan Berat", icon:<MdOutlineFoodBank className="icon"/>, description:"Hidangan enak dan mengenyangkan untuk makan siang atau malam."},
        {type:"Minuman", icon:<RiDrinks2Line className="icon"/>, description:"Minuman segar yang menyegarkan dahaga dan cerahkan hari!"}
    ]
    return(
        <>
            {product.map((x,y)=>{
                return(
                    <div className="katalogContainer" key={y}>
                        <h3 style={{padding:"5px"}}>{x.type}</h3>
                        <div className="iconContainer">
                            {x.icon}
                        </div>
                        <div>
                            <section className="sectionKatalog">
                                {x.description}
                            </section>
                        </div>
                    </div>
                )
            })}
        </>
    )
}