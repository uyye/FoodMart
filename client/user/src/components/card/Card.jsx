import { formatIDR } from "../../helpers/formatIDR";
import "./card.css"
export default function Card({item}) {    
    return(
        <div className="cardContainer">
            <div className="cardImage">
                <img src={item.imageUrl} alt=""  className="prevImageCard"/>
            </div>
            <div className="cardDetail">
                <h3 style={{fontWeight:"normal"}}>{item.name}</h3>
                <div className="stockPriceCard">
                    <p style={{color:"#6aaa57"}}>{formatIDR(item.price)}</p>
                    <p>Stock {`[${item.stock}]`}</p>
                </div>
            </div>
        </div>
    )
}